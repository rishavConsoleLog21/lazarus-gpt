import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

// Load environment variables from .env file
config();
const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Log requests to the console
// Remove this middleware for production
app.use(morgan("dev"));

app.use('/api/v1', appRouter);

export default app;
