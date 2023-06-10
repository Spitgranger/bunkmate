import mediaPost from "../models/mediaPost.js";
import mediaPostComment from "../models/mediaPostComment.js";
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
        res.status(201).json(newPost);

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error has Occured");
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
            },
        },
        {
            $project:
            {
                "profile.firstName": 1,
                "profile.picture": 1,
                "userId": 1,
                "message": 1,
                "comments": 1,
                "images": 1,
                "likes": 1,
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
        },
        {
            $project:
            {
                "profile.firstName": 1,
                "profile.picture": 1,
                "userId": 1,
                "message": 1,
                "request.address": 1,
                "images": 1,
                "likes": 1,
            }
        },
        {
            $lookup:
            {
                from: "mediapostcomments",
                localField: "_id",
                foreignField: "mediaPost",
                as: "comments"
            }
        }
    ]).then((result) => { res.status(200).json(result) });
}

export const makeComment = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const user = req.userId;
        const data = req.body;
        const post = await mediaPost.findById(_id);
        const comment = await mediaPostComment.create({ dateCreated: new Date(), message: data.message, userId: user, mediaPost: post._id });
        //post.comments.push(comment._id);
        const updatedPost = await mediaPost.findByIdAndUpdate(_id, post, { new: true });
        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const userId = req.userId;
        const post = await mediaPost.findById(_id);
        const index = post.likes.findIndex((_id) => String(_id) === String(userId));
        if (index === -1) {
            //like
            post.likes.push(req.userId);
        } else {
            //unlinke
            post.likes = post.likes.filter((_id) => String(_id) !== String(userId))
        }
        const updatedPost = await mediaPost.findByIdAndUpdate(_id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const user = req.userId;
        const post = await mediaPost.findById(_id);
        if (String(post.userId) !== String(user)) {
            return res.status(403);
        }
        await mediaPost.findByIdAndDelete(post._id);
        res.status(200).json({ message: "Post deleted sucessfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const deleteComment = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const user = req.userId;
        const comment = await mediaPostComment.findById(_id);
        if (String(comment.userId) !== String(user)) {
            return res.status(403).send('Cannot delete comments that you have not made');
        }
        await mediaPostComment.findByIdAndDelete(comment._id);
        res.status(200).json({ message: "Comment Deleted sucessfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}