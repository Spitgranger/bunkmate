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
        const profile = await Profile.findOne({ user: req.userId }).select("about address city credit education email employment firstName gender income lastName links phone picture province");
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "no profile associated with this account" });
    }
}
