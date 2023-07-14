import Profile from '../models/profile';
import mongoose from 'mongoose';
import {Request, Response} from "express";

interface ClientRequest extends Request {
    userId: string,
}

export const createProfile = async (req: Request, res: Response) => {
    const profileData = req.body;
    console.log(profileData);
    try {
        const request: ClientRequest = req as ClientRequest;
        const existingProfile = await Profile.findOne({ user: request.userId });
        console.log(existingProfile);
        if (existingProfile) {
            res.status(409).json("profile already exists");
            return;
        }
        const newProfile = new Profile({ ...profileData, user: request.userId })
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error: any) {
        res.status(409).json({ message: error.message })
        console.log(error)
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const request: ClientRequest = req as ClientRequest;
        const profile = await Profile.findOne({ user: request.userId }).select("country about address age birthday cannabis city cleanliness credit drinking education email employment firstName gender havePets lastName occupation phone picture province sleepSchedule smoking tolerateGuests toleratePets");
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: "no profile associated with this account" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
}

export const getProfiles = async (req: Request, res: Response) => {
    try {
        const profileArray = req.params.profiles.split(".");
        console.log(profileArray)
        const result = await Profile.find({ 'user': { $in: profileArray } })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
}
//controller to delete profile
export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const request: ClientRequest = req as ClientRequest;
        const profileUserId: string = request.userId;
        console.log(profileUserId)
        const existingProfile = await Profile.findOne({ user: profileUserId });
        if (existingProfile) {
            await Profile.deleteOne({ _id: existingProfile._id });
        } else {
            res.status(404).json("No profile associated with this account");
            return;
        }
        res.json(`Profile for user ${profileUserId} deleted successfully`).status(204);
    } catch (error) {
        console.log(error)
        res.json(error).status(500);
    }
}

