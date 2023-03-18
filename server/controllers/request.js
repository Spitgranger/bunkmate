import Request from "../models/request.js";
import Profile from "../models/profile.js";

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

export const getRequests = async (req, res) => {
    let today = new Date();
    let results
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