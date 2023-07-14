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
exports.authorizeSocketUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../redis"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const authReq = req;
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (token !== undefined) {
            let decodedData;
            decodedData = jsonwebtoken_1.default.verify(token, 'test');
            authReq.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.id;
            req = authReq;
            next();
        }
        else {
            res.status(500).json("Error when parsing access token");
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json("must be logged in");
    }
});
const authorizeSocketUser = (Socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socket = Socket;
        const token = socket.handshake.auth.token;
        let decodedData;
        if (token !== undefined) {
            decodedData = jsonwebtoken_1.default.verify(token, 'test');
        }
        if (decodedData !== undefined) {
            socket.user = decodedData;
        }
        console.log(socket.user);
        redis_1.default.hset(`chatid:${socket.user.email}`, "chatid", socket.user.chatId);
        next();
    }
    catch (error) {
        console.log(error);
        next(new Error("Unauthorized"));
    }
});
exports.authorizeSocketUser = authorizeSocketUser;
exports.default = auth;
