import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { StreamChat } from "stream-chat";
import dotenv from 'dotenv'
import multer from "multer";
dotenv.config();
//old stream chat api key and api secret
//const streamChat = StreamChat.getInstance("asnpsp7e72h6", "djzm2aq63636qg2mjeqx9x5422hb4qu78pqepyf7fx7j7fuu44zwdgathr24zeyu");

//new streamchat api key and api secret
//const streamChat = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_PRIVATE_API_KEY);

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        // //const { users: [user] } = await streamChat.queryUsers({ id: existingUser._id });
        // if (user === null) {
        //     return res.status(401).send();
        // }
        // //const streamToken = streamChat.createToken(String(existingUser._id));
        res.status(200).json({ result: existingUser, token, /*streamToken*/ });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong like a gofu' })
        console.log(error)
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, phoneNumber, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        //const existingUsers = await streamChat.queryUsers({ id: existingUser.id });
        if (existingUser?.users?.length > 0) {
            return res.status(400).send("User Id taken")
        }
        if (existingUser) return res.status(400).json({ message: 'User already exists. Signin' })
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email: email, password: hashedPassword, phoneNumber: phoneNumber, name: name })
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
        //await streamChat.upsertUser({ id: String(result._id), name: result.name });
        res.status(200).json({ result, token })
        console.log('success')
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong like a gofu' })
        console.log(error)
    }
}