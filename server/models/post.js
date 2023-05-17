import mongoose from 'mongoose';
//this is the schema for listing posts associated with real estate developer companies

const reqString = {
    type: String,
    required: true,
}

const postSchema = mongoose.Schema({
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    address: reqString,
    image: reqString,
    price: reqString,
    bedBath: reqString,
});

const Post = mongoose.model('Post', postSchema);

export default Post;