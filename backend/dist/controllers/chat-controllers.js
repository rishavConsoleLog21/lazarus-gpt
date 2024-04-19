import User from "../models/User.js";
import OpenAI from "openai";
export const generateChatCompletion = async (req, res, next) => {
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
            organization: process.env.OPENAI_ORG_ID,
        });
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            //@ts-expect-error
            messages: chats
        });
        user.chats.push(chatCompletion.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map