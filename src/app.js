import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import config from "./config.js";
import logger from "./utils/logger.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import { AppError } from "./middleware/errorHandler.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: "error", message: "Too many requests, please try again later." },
  })
);

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Compression
app.use(compression());

// Request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", routes);

// 404 handler
app.all("*", (req, _res, _next) => {
  throw new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
});

// Global error handler
app.use(errorHandler);

export default app;
