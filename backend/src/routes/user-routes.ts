import { Router } from "express";
import { getAllUsers } from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

export default userRouter;
