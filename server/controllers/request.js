import Request from "../models/request.js";

export const createRequest = async (req, res) => {
    const requestData = req.body;
    try{
        const existingRequest = await Request.findOne({ user: req.userId });
        console.log(existingRequest);
        if (existingRequest) {
            res.status(409).json("profile already exists");
            return;
        }
        const newRequest = new Request({...requestData, user: req.userId});
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error){
        console.log(error);
        res.status(500).json("Something went wrong");
    }
}

export const getRequests = async (req, res) => {
    console.log("Hello");
}