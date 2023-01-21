import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    price: Number,
    tags: [String],
    number_of_roomates: Number,
    number_of_bedrooms: Number,
    number_of_bathrooms: Number,
    date_available: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;