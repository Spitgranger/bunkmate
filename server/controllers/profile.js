import Profile from '../models/profile.js'

export const createProfile = async (req, res) => {
    const profileData = req.body;
    console.log(profileData);
    try {
        const existingProfile = await Profile.findOne({ user: req.userId });
        console.log(existingProfile);
        if (existingProfile) {
            res.status(409).json("profile already exists");
            return;
        }
        const newProfile = new Profile({ ...profileData, user: req.userId })
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message })
        console.log(error)
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.userId }).select("about address age birthday cannabis city cleanliness credit drinking education email employment firstName gender havePets lastName occupation phone picture province sleepSchedule smoking tolerateGuests toleratePets");
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

