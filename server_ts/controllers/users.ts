import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import UserModel, {User} from '../models/user';
import dotenv from 'dotenv';
import {Request, Response} from "express";
import {v4 as uuidv4} from 'uuid';
import redisClient from "../redis";

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

dotenv.config();

/**
 * Controller for signin route. extracts user from database and checks to see if provided password matches,
 * if matching, return a JWT that is representative of the current session as well as the user's information.
 * @param req Request object
 * @param res Response object
 */
export const signin = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const existingUser: User | null = await UserModel.findOne({email});
        if (!existingUser) return res.status(404).json({loggedIn: false, message: "User doesn't exist"})
        const isPasswordCorrect: boolean = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({loggedIn: false, message: 'Invalid Credentials'})
        // req.session.user = {
        //     id: existingUser._id,
        //     email: existingUser.email,
        //     chatId: existingUser.chatId,
        // }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id, chatId: existingUser.chatId}, "test", {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'something went wrong like a gofu'})
        console.log(error);
    }
}

/**
 * Controller for signup route. Takes information from signup and attempts to find an existing user with the provided email.
 * If none, create the user and return the user object as well as JWT to authenticate the session.
 * @param req Request object
 * @param res Response object
 */
export const signup = async (req: Request, res: Response) => {
    const {email, password, confirmPassword, phoneNumber, firstName, lastName} = req.body;
    try {
        const existingUser: User | null = await UserModel.findOne({email});
        if (existingUser) return res.status(400).json({loggedin: false, message: 'User already exists. Please sign in'});
        if (password !== confirmPassword) {
            return res.status(400).json({loggedin: false, message: 'Passwords do not match'});
        }
        const hashedPassword: string = await bcrypt.hash(password, 12);
        const result: User = await UserModel.create({
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            chatId: uuidv4(),
        });
        const token: String = jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "1h"});
        // req.session.user = {
        //     email: result.email,
        //     id: result._id,
        //     chatId: result.chatId,
        // };
        //await streamChat.upsertUser({ id: String(result._id), name: result.name });
        res.status(200).json({result, token});
        console.log('success');

    } catch (error) {
        res.status(500).json({message: 'something went wrong during the signup process'})
        console.log(error)
    }
}
/**
 * @description Controller function to sign-out users and invalidate their tokens.
 * @param req {Request} The request object where we retrieve the token.
 * @param res {Response} The response object
 */
export const signout = async (req: Request, res: Response) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (token !== undefined) {
        const decodedToken: JwtPayload = await jwt.verify(token, "test") as JwtPayload;
        let expiry: number;
        decodedToken?.exp ? expiry = decodedToken.exp : expiry = -1;
        //In this case the token has already expired or expiry date is invalid so adding it to the blacklist is unnecessary.
        if (expiry < 0 || expiry === -1) {
            return
        }
        //Calculate seconds until the JWT expires
        const secondsTillExpiry: number = Math.ceil(expiry - (Date.now()/1000));
        //Execute the redis query where we add the token to a hashset with key blacklist:token and value exists. This key expires when the jwt expires.
        const response = await redisClient.multi().hset(`blacklist:${token}`, "exists", 1).expire(`blacklist:${token}`, secondsTillExpiry).exec();
        return
    }

}