import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { Redis } from 'ioredis';
import { config } from 'dotenv';
config();

// Create Redis client for rate limiting
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    enableOfflineQueue: false,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        if (times > 3) {
            return null; // Stop retrying after 3 attempts
        }
        return Math.min(times * 100, 3000); // Exponential backoff
    }
});

redisClient.on('error', (err) => {
    console.error('Rate Limiter Redis Error:', err);
});

// Create memory store fallback for development
const createRateLimiter = () => {
    const config = {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 250, // Increased limit
        message: 'Too many requests from this IP, please try again later',
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req) => req.url.includes('/get-courses') || req.user?.role === 'admin', // Skip rate limiting for courses endpoint and admin users
        skipFailedRequests: true // Don't count failed requests
    };

    if (process.env.NODE_ENV === 'development') {
        return rateLimit(config);
    }

    return rateLimit({
        ...config,
        store: new RedisStore({
            sendCommand: (...args: any[]) => redisClient.call(...args),
            prefix: 'rl:',
            client: redisClient as any
        })
    });
};

export const rateLimiter = createRateLimiter();