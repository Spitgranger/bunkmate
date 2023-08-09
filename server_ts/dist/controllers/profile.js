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
exports.deleteProfile = exports.getProfiles = exports.getProfile = exports.createProfile = void 0;
const profile_1 = __importDefault(require("../models/profile"));
const user_1 = __importDefault(require("../models/user"));
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileData = req.body;
    console.log(profileData);
    try {
        const request = req;
        const existingProfile = yield profile_1.default.findOne({ user: request.userId });
        console.log(existingProfile);
        if (existingProfile) {
            res.status(409).json("profile already exists");
            return;
        }
        const user = yield user_1.default.findOne({ _id: request.userId });
        const newProfile = new profile_1.default(Object.assign(Object.assign({}, profileData), { user: request.userId, lastName: user === null || user === void 0 ? void 0 : user.lastName, firstName: user === null || user === void 0 ? void 0 : user.firstName }));
        yield newProfile.save();
        res.status(201).json(newProfile);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
});
exports.createProfile = createProfile;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req;
        const profile = yield profile_1.default.findOne({ user: request.userId }).select("country about address age birthday cannabis city cleanliness credit drinking education email employment firstName gender havePets lastName occupation phone picture province sleepSchedule smoking tolerateGuests toleratePets");
        if (profile) {
            res.status(200).json(profile);
        }
        else {
            res.status(404).json({ message: "no profile associated with this account" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});
exports.getProfile = getProfile;
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileArray = req.params.profiles.split(".");
        console.log(profileArray);
        const result = yield profile_1.default.find({ 'user': { $in: profileArray } });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json(error);
        console.log(error);
    }
});
exports.getProfiles = getProfiles;
//controller to delete profile
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req;
        const profileUserId = request.userId;
        console.log(profileUserId);
        const existingProfile = yield profile_1.default.findOne({ user: profileUserId });
        if (existingProfile) {
            yield profile_1.default.deleteOne({ _id: existingProfile._id });
        }
        else {
            res.status(404).json("No profile associated with this account");
            return;
        }
        res.json(`Profile for user ${profileUserId} deleted successfully`).status(204);
    }
    catch (error) {
        console.log(error);
        res.json(error).status(500);
    }
});
exports.deleteProfile = deleteProfile;
