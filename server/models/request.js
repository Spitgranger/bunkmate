import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const requestSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
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
        require: true,
    },
    //listingObject stores string and object depending on which item is selected in the dropdown menu
    listingObject: {
        type: ObjectId,
        require: false,
    },
    aboutUs: {
        type: Number,
        require: false,
    },
    request: {
        type: String,
        require: true,
    },
})

const Request = mongoose.model('Request', requestSchema);

export default Request;