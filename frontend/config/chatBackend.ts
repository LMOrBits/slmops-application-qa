export const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || "",
} as const;

export const CHAT_API_URL = process.env.CHAT_API_URL || "http://localhost:8000";

export default { redisConfig, CHAT_API_URL };
