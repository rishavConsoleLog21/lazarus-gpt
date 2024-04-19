import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRouter from "./chat-routes.js";
const appRouter = Router();
// define the user routes for the app
appRouter.use("/user", userRouter);
// add the chat router to the app router
appRouter.use("/chat", chatRouter);
export default appRouter;
//# sourceMappingURL=index.js.map