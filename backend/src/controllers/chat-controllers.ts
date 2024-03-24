import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
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

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // Save the updated user data
    const openai = configureOpenAI();
    const chatCompletion = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
