import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    employment: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    }, 
    picture: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;