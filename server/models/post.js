import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    price: Number,
    tags: [String],
    num_roomates: Number,
    num_bedrooms: Number,
    num_bathrooms: Number,
    date_available: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;