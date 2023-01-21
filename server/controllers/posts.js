import Post from '../models/post.js'

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json({
        data: posts,
    })
};

export const createPost = async (req, res) => {
    
};