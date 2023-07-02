import {NextFunction, Request, Response} from "express";
import redisClient from "../redis";

/**
 * Middleware function to rate limit API request to 10 requests per minute, sends message to client if requests exceed 10/min.
 * Requests are identified by ip address
 * @param req
 * @param res
 * @param next
 */
export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ip: string | undefined = req.socket.remoteAddress;
    if (ip !== undefined) {
        const response = await redisClient.multi().incr(ip).expire(ip, 10).exec();
        let requestCount = 0;
        if (response) {
            requestCount = response[0][1] as number;
        }
        if (requestCount > 10) {
            res.status(429).json({loggedIn: false, message: "Too many requests"});
        }
        else next();
    }
}