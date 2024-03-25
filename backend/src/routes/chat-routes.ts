import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRouter = Router();

chatRouter.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRouter.get(
  "/all-chats",
  verifyToken,
  sendChatsToUser
);

export default chatRouter;
