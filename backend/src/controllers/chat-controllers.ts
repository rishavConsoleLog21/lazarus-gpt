import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = req.body.message;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Call OpenAI API to generate chat completion
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Send all chats with new one to OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
      organization: process.env.OPENAI_ORG_ID
    })

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      //@ts-expect-error
      messages: chats,
      max_tokens: 75,
    });
    console.log(chatCompletion)
    // for await (const chunk of chatCompletion) {
    //   process.stdout.write(chunk.choices[0]?.delta?.content || "");
    // }
    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
