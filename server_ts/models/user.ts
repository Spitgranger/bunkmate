import {Schema, model, Document} from 'mongoose';

export interface User extends Document {
    email: string,
    phoneNumber: Number,
    password: string,
    firstName: string,
    lastName: string,
    chatId: string,
}

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    }
});

const User = model<User>('User', userSchema);

export default User;