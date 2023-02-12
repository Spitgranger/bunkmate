import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong like a gofu' })
        console.log(error)
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, phoneNumber } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists. Signin' })
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email: email, password: hashedPassword, phoneNumber: phoneNumber })
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
        res.status(200).json({ result, token })
        console.log('success')
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong like a gofu' })
        console.log(error)
    }

}