import Request from "../models/request.js";
import Profile from "../models/profile.js";
import mongoose from "mongoose";

export const createRequest = async (req, res) => {
    const requestData = req.body;
    try {
        const existingRequest = await Request.findOne({ user: req.userId });
        if (existingRequest) {
            res.status(409).json("profile already exists");
            return;
        }
        const newRequest = new Request({ ...requestData, user: req.userId });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const userId = req.userId;
        const existRequest = await Request.findOne({ user: userId })
        await Request.deleteOne({ _id: existRequest._id });
        res.status(204).json(`Request for user ${userId} delete successfully`);
    } catch (error) {
        res.status(500).json("User has no requests");
    }
}

export const updateRequest = async (req, res) => {
    try {
        const userId = req.userId;
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Post doesn't exist");
        const updatedPost = await Request.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatedPost).status(201);

    } catch (error) {
        res.status(500).json("Something went wrong during updateing.")
    }
}

export const getRequests = async (req, res) => {
    //Can add more criterion to this query when limit to map range is needed
    Request.aggregate([
        {
            $lookup:
            {
                from: "profiles",
                localField: "user",
                foreignField: "user",
                as: "profile",
            }
        },
        {
            $lookup:
            {
                from: "posts",
                localField: "listingObject",
                foreignField: "_id",
                as: "listing",
            }
        }
    ]).then((result) => { res.json(result).status(200) })
    /*
    const requestingUser = req.userId;
    let returnListingData = [];
    const existingRequests = await Request.find().populate("user").populate("listingObject");
    for (const element of existingRequests) {
        const profile = await Profile.find({ user: element.user._id })
    }
    //console.log(existingRequests)
    */

}