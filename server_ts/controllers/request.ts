import RequestModel, {RequestR} from "../models/request";
//import Profile from "../models/profile";
import mongoose from "mongoose";
import {Request, Response} from "express";

interface ClientRequest extends Request {
    userId: string
}

export const createRequest = async (req: Request, res: Response) => {
    const requestData = req.body;
    try {
        const request: ClientRequest = req as ClientRequest;
        const existingRequest = await RequestModel.findOne({ user: request.userId });
        if (existingRequest) {
            res.status(409).json("profile already exists");
            return;
        }
        const newRequest = new RequestModel({ ...requestData, user: request.userId });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
}

export const deleteRequest = async (req: Request, res: Response) => {
    try {
        const request: ClientRequest = req as ClientRequest;
        const userId: string = request.userId;
        const existRequest: RequestR | null = await RequestModel.findOne({ user: userId })
        await RequestModel.deleteOne({ _id: existRequest?._id });
        res.status(204).json(`Request for user ${userId} delete successfully`);
    } catch (error) {
        res.status(500).json("User has no requests");
    }
}

export const updateRequest = async (req: Request, res: Response) => {
    try {
        const request: ClientRequest = req as ClientRequest;
        const userId: string = request.userId;
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Post doesn't exist");
        const updatedPost = await RequestModel.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatedPost).status(201);

    } catch (error) {
        res.status(500).json("Something went wrong during updating.")
    }
}

export const getRequests = async (req: Request, res: Response) => {
    //Can add more criterion to this query when limit to map range is needed
    RequestModel.aggregate([
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