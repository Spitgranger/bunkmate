import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    address: {
        type: String,
        required: true,
    },
    budget: Number,
    number_of_roomates: Number,
    start_date: Date,
    term: String,
    range: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;