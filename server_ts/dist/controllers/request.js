"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequests = exports.updateRequest = exports.deleteRequest = exports.createRequest = void 0;
const request_1 = __importDefault(require("../models/request"));
//import Profile from "../models/profile";
const mongoose_1 = __importDefault(require("mongoose"));
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestData = req.body;
    try {
        const request = req;
        const existingRequest = yield request_1.default.findOne({ user: request.userId });
        if (existingRequest) {
            res.status(409).json("profile already exists");
            return;
        }
        const newRequest = new request_1.default(Object.assign(Object.assign({}, requestData), { user: request.userId }));
        yield newRequest.save();
        res.status(201).json(newRequest);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
});
exports.createRequest = createRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req;
        const userId = request.userId;
        const existRequest = yield request_1.default.findOne({ user: userId });
        yield request_1.default.deleteOne({ _id: existRequest === null || existRequest === void 0 ? void 0 : existRequest._id });
        res.status(204).json(`Request for user ${userId} delete successfully`);
    }
    catch (error) {
        res.status(500).json("User has no requests");
    }
});
exports.deleteRequest = deleteRequest;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req;
        const userId = request.userId;
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(_id))
            return res.status(404).send("Post doesn't exist");
        const updatedPost = yield request_1.default.findByIdAndUpdate(_id, Object.assign(Object.assign({}, post), { _id }), { new: true });
        res.json(updatedPost).status(201);
    }
    catch (error) {
        res.status(500).json("Something went wrong during updating.");
    }
});
exports.updateRequest = updateRequest;
const getRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Can add more criterion to this query when limit to map range is needed
    request_1.default.aggregate([
        {
            $lookup: {
                from: "profiles",
                localField: "user",
                foreignField: "user",
                as: "profile",
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "listingObject",
                foreignField: "_id",
                as: "listing",
            }
        }
    ]).then((result) => { res.json(result).status(200); });
    /*
    const requestingUser = req.userId;
    let returnListingData = [];
    const existingRequests = await Request.find().populate("user").populate("listingObject");
    for (const element of existingRequests) {
        const profile = await Profile.find({ user: element.user._id })
    }
    //console.log(existingRequests)
    */
});
exports.getRequests = getRequests;
