import mongoose from 'mongoose';

const mediaPostSchema = mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    comments: {
        type: [String],
        required: true,
    }
})

const mediaPost = mongoose.model('mediaPost', mediaPostSchema);

export default mediaPost;