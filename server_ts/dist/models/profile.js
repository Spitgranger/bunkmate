"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
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
const ProfileModel = (0, mongoose_1.model)('Profile', profileSchema);
exports.default = ProfileModel;
