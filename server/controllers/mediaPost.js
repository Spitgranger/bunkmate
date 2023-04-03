import mediaPost from "../models/mediaPost.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";

export const makePost = async (req, res) => {
    try {
        const reqData = req.body
        const userId = req.userId;
        const existingPost = await mediaPost.find({ "userId": userId });
        //this is wrong lol. fix 
        if (existingPost === []) {
            res.status(409).json("User already has a post")
            return;
        }
        const newPost = new mediaPost({ ...reqData, userId: req.userId, dateCreated: new Date().toISOString() });
        await newPost.save();
        res.status(201).json("mediaPost sucessfully created");

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error has Occured")
    }
}

export const getPost = async (req, res) => {
    //const existingPosts = await mediaPost.find({});
    mediaPost.aggregate([
        {
            $lookup:
            {
                from: "profiles",
                localField: "userId",
                foreignField: "user",
                as: "profile",
            }
        },
        {
            $lookup:
            {
                from: "requests",
                localField: "userId",
                foreignField: "user",
                as: "request",
            }
        }
    ]).then((result) => { res.status(200).json(result) })
}

export const makeComment = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.userId
    const data = req.body
    const post = await mediaPost.findById(_id)
    post.comments.push([user, data.message]);
    const updatedPost = await mediaPost.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost)
}