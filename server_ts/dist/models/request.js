"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    request: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        required: true,
    },
    dateValue: {
        type: String,
        required: true,
    },
    flexibility: {
        type: String,
        required: true,
    },
    rentBudget: {
        type: Number,
        required: true,
    },
    idealLengthStay: {
        type: String,
        required: true,
    },
    idealLocation: {
        type: [Number],
        require: true,
    },
    numRoommates: {
        type: String,
        required: true,
    },
    roommateGender: {
        type: String,
        required: true,
    },
    rangeSliderValue: {
        type: [Number],
        required: true,
    },
    //listingObject stores string and object depending on which item is selected in the dropdown menu
    listingObject: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Post",
        required: false,
    },
    aboutUs: {
        type: String,
        required: false,
    },
    linkChats: {
        type: [String],
        required: false,
    },
    groupTags: {
        type: [String],
        required: false,
    },
    groupPhoto: {
        type: String,
        required: false,
    }
});
const Request = (0, mongoose_1.model)('Request', requestSchema);
exports.default = Request;
