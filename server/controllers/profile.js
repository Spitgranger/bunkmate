import Profile from '../models/profile.js'

export const createProfile = async (req, res) => {
    const profileData = req.body;
    console.log(profileData);
    const newProfile = new Profile({ ...profileData, user: req.userId })
    try {
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message })
        console.log(error)
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = Profile.findById(req.userId);
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "no profile associated with this account" });
    }
}