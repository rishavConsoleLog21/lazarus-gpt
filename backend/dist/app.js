import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Load environment variables from .env file
config();
const app = express();
app.use(cors({ origin: "https://lazarus-gpt.vercel.app/", credentials: true, methods: ["GET", "POST"] }));
// Parse incoming JSON requests
app.use(express.json());
// Parse incoming Cookie header and populate req.cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
// Log requests to the console
// Remove this middleware for production
// app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map