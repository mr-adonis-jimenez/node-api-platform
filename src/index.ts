import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { env } from "./config/env";
import { logger } from "./utils/logger";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimiter } from "./middlewares/rateLimiter";
import userRoutes from "./routes/userRoutes";

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/users", userRoutes);

// Error handler
app.use(errorMiddleware);

// Start
async function start() {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Connected to MongoDB");

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
