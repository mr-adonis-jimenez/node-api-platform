import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "*",
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
