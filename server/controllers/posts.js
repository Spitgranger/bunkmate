import Post from '../models/post.js'

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json({
        data: posts,
    })
};

export const createPost = async (req, res) => {
    const postData = req.body;
    console.log(postData);
    const newPost = new Post({...postData})
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json( {message: error.message} )
        console.log(error)
    }
};