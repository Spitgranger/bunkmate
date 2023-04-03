import mediaPost from "../models/mediaPost.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";

export const makePost = async (req, res) => {
    try {
        const reqData = req.body
        const userId = req.userId;
        const existingPost = await mediaPost.find({ "userId": userId });
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