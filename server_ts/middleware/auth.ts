import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, NextFunction, Response, RequestHandler} from 'express';
import {Socket} from "socket.io";
import {SessionSocket} from "../server";
import redisClient from "../redis";
// want to like a post
// click the like button ==> auth middleWare(NEXT) => like controller
interface AuthMiddlewareRequest extends Request {
    userId: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthMiddlewareRequest;
        const token = req?.headers?.authorization?.split(' ')[1];
        if (token !== undefined) {
            const existsInBlacklist = await redisClient.hget(`blacklist:${token}`, "exists");
            if (existsInBlacklist) {
                res.status(403).json("Unauthorized as token has already been invalidated");
            }
            let decodedData;
            decodedData = jwt.verify(token, 'test') as JwtPayload;
            authReq.userId = decodedData?.id;
            req = authReq;
            next();
        } else {
            res.status(500).json("Error when parsing access token");
        }
    } catch (error) {
        console.log(error);
        res.status(403).json("must be logged in and/or invalid token");
    }
}

export const authorizeSocketUser = async (Socket: Socket, next: any) => {
    try {
        const socket = Socket as SessionSocket;
        const token = socket.handshake.auth.token;
        let decodedData;
        if (token !== undefined) {
            decodedData = jwt.verify(token, 'test') as { email: string, chatId: string, id: string }
        }
        if (decodedData !== undefined) {
            socket.user = decodedData
        }
        console.log(socket.user);
        redisClient.hset(`chatid:${socket.user.email}`,
            "chatid",
            socket.user.chatId,
        );
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Unauthorized"));
    }

}

export default auth