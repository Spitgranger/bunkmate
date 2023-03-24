import mongoose from 'mongoose'
const requestSchema = mongoose.Schema({
    request: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
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
    dateValue: {
        type: String,
        required: true,
    },
    rangeSliderValue: {
        type: [Number],
        required: true,
    },
    //listingObject stores string and object depending on which item is selected in the dropdown menu
    listingObject: {
        type: mongoose.SchemaTypes.ObjectId,
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
})

const Request = mongoose.model('Request', requestSchema);

export default Request;