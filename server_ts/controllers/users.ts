import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, {User} from '../models/user';
import dotenv from 'dotenv';
import {Request, Response} from "express";
import session from 'express-session';

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
        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"});
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
    const {email, password, confirmPassword, phoneNumber, name} = req.body;
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
            name: name
        });
        const token: String = jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "1h"});
        req.session.user = {
            email: result.email,
            id: result._id,
        };
        //await streamChat.upsertUser({ id: String(result._id), name: result.name });
        res.status(200).json({result, token});
        console.log('success');
    } catch (error) {
        res.status(500).json({message: 'something went wrong like a gofu'})
        console.log(error)
    }
}