"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const redis_1 = __importDefault(require("../redis"));
/**
 * Middleware function to rate limit API request to 10 requests per minute, sends message to client if requests exceed 10/min.
 * Requests are identified by ip address
 * @param req
 * @param res
 * @param next
 */
const rateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.socket.remoteAddress;
    if (ip !== undefined) {
        const response = yield redis_1.default.multi().incr(ip).expire(ip, 10).exec();
        let requestCount = 0;
        if (response) {
            requestCount = response[0][1];
        }
        if (requestCount > 10) {
            res.status(429).json({ loggedIn: false, message: "Too many requests" });
        }
        else
            next();
    }
});
exports.rateLimiter = rateLimiter;
