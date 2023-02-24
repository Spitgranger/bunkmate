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
    cannabis: {
        type: String,
        requried: true,
    },
    rentBudget: {
        type: Number,
        required: true,
    },
    idealLocation: {
        type: [Number],
        required: true,
    },
    idealLengthStay: {
        type: String,
        required: true,
    },
    havePets: {
        type: String,
        required: true,
    },
    sleepSchedule:{
        type: String,
        required:true,
    },
    cleanliness:{
        type: String,
        required: true,
    },
    drinking:{
        type: String, 
        required: true,
    },
    smoking: {
        type: String,
        required: true,
    },
    occupation:{
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
    }
})

const Request = mongoose.model('Request', requestSchema);

export default Request;