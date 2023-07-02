import {Schema, model, Document} from 'mongoose';

export interface User extends Document {
    email: string,
    phoneNumber: Number,
    password: string,
    name: string,
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
    name: {
        type: String,
        required: false,
    },
});

const User = model<User>('User', userSchema);

export default User;