import Redis from "ioredis";
import { redisConfig } from "@/config/redis";

export const redis = new Redis(Number(redisConfig.port), redisConfig.host);

export default { redis };
