import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../redis";
import dotenv from "dotenv";
import {Socket} from "socket.io";

dotenv.config();

let redisStore = new (RedisStore as any)({
    client: redisClient,
});


const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET as string,
    name: "sid",
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? true : "auto",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
});

export const wrap = (expressMiddleware: any) => (socket: Socket, next: any) => expressMiddleware(socket.request, {}, next)

export default sessionMiddleware;