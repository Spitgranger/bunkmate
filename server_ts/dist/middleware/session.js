"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = __importDefault(require("../redis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let redisStore = new connect_redis_1.default({
    client: redis_1.default,
});
const sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET,
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
const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next);
exports.wrap = wrap;
exports.default = sessionMiddleware;
