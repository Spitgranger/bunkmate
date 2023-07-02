import {Schema, model, SchemaTypes, Document} from 'mongoose'

export interface RequestR extends Document {
    request: string,
    user: object,
    address: string,
    dateValue: string,
    flexibility: string,
    rentBudget: number,
    idealLengthStay: string,
    idealLocation: number[],
    numRoommates: string,
    roommateGender: string,
    rangeSliderValue: number[],
    listingObject: object,
    aboutUs: string,
    linkChats: string[],
    groupTags: string[],
    groupPhoto: string,
}

const requestSchema = new Schema<RequestR>({
    request: {
        type: String,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
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
        type: SchemaTypes.ObjectId,
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
})

const Request = model<RequestR>('Request', requestSchema);

export default Request;