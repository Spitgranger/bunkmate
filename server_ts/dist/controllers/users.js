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
exports.signout = exports.signup = exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const redis_1 = __importDefault(require("../redis"));
dotenv_1.default.config();
/**
 * Controller for signin route. extracts user from database and checks to see if provided password matches,
 * if matching, return a JWT that is representative of the current session as well as the user's information.
 * @param req Request object
 * @param res Response object
 */
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ loggedIn: false, message: "User doesn't exist" });
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ loggedIn: false, message: 'Invalid Credentials' });
        // req.session.user = {
        //     id: existingUser._id,
        //     email: existingUser.email,
        //     chatId: existingUser.chatId,
        // }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id, chatId: existingUser.chatId }, "test", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong like a gofu' });
        console.log(error);
    }
});
exports.signin = signin;
/**
 * Controller for signup route. Takes information from signup and attempts to find an existing user with the provided email.
 * If none, create the user and return the user object as well as JWT to authenticate the session.
 * @param req Request object
 * @param res Response object
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, phoneNumber, name } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ loggedin: false, message: 'User already exists. Please sign in' });
        if (password !== confirmPassword) {
            return res.status(400).json({ loggedin: false, message: 'Passwords do not match' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const result = yield user_1.default.create({
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
            name: name,
            chatId: (0, uuid_1.v4)(),
        });
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
        // req.session.user = {
        //     email: result.email,
        //     id: result._id,
        //     chatId: result.chatId,
        // };
        //await streamChat.upsertUser({ id: String(result._id), name: result.name });
        res.status(200).json({ result, token });
        console.log('success');
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong during the signup process' });
        console.log(error);
    }
});
exports.signup = signup;
/**
 * @description Controller function to sign-out users and invalidate their tokens.
 * @param req {Request} The request object where we retrieve the token.
 * @param res {Response} The response object
 */
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (token !== undefined) {
        const decodedToken = yield jsonwebtoken_1.default.verify(token, "test");
        let expiry;
        (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.exp) ? expiry = decodedToken.exp : expiry = -1;
        //In this case the token has already expired or expiry date is invalid so adding it to the blacklist is unnecessary.
        if (expiry < 0 || expiry === -1) {
            return;
        }
        //Calculate seconds until the JWT expires
        const secondsTillExpiry = Math.ceil(expiry - (Date.now() / 1000));
        //Execute the redis query where we add the token to a hashset with key blacklist:token and value exists. This key expires when the jwt expires.
        const response = yield redis_1.default.multi().hset(`blacklist:${token}`, "exists", 1).expire(`blacklist:${token}`, secondsTillExpiry).exec();
        return;
    }
});
exports.signout = signout;
