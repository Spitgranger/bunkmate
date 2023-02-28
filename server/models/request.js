import mongoose from 'mongoose'

const requestSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    address: {
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
        type: Array,
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
        type: Object,
        required: true,
    },
    rangeSliderValue: {
        type: Array,
        require: true,
    },
    listingObject: {
        type: Object,
        require: true,
    }
})

const Request = mongoose.model('Request', requestSchema);

export default Request;