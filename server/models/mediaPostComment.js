import mongoose from 'mongoose';

const mediaPostCommentSchema = mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    mediaPost: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
})

const mediaPostComment = mongoose.model('mediaPostComment', mediaPostCommentSchema);

export default mediaPostComment;