import mongoose from 'mongoose';

const mediaPostSchema = mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: true
    },
    comments: {
        type: [[String]],
        required: true,
    }
})

const mediaPost = mongoose.model('mediaPost', mediaPostSchema);

export default mediaPost;