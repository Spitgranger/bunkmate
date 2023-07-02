import {Schema, SchemaTypes, model, Document} from 'mongoose';

export interface Profile extends Document {
    user: Object,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    employment: string,
    phone: string,
    birthday: string,
    address: string,
    province: string,
    city: string,
    country: string,
    education: string,
    picture: string,
    about: string,
    age: string,
    havePets: string,
    sleepSchedule: string,
    cleanliness: string,
    drinking: string,
    smoking: string,
    cannabis: string,
    occupation: string,
    tolerateGuests: string,
    toleratePets: string,
}

const profileSchema = new Schema<Profile>({
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    employment: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    havePets: {
        type: String,
        required: true,
    },
    sleepSchedule: {
        type: String,
        required: true,
    },
    cleanliness: {
        type: String,
        required: true,
    },
    drinking: {
        type: String,
        required: true,
    },
    smoking: {
        type: String,
        required: true,
    },
    cannabis: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    tolerateGuests: {
        type: String,
        required: true,
    },
    toleratePets: {
        type: String,
        required: true,
    },
});

const ProfileModel = model<Profile>('Profile', profileSchema);

export default ProfileModel;