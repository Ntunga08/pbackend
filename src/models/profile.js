import mongoose from "mongoose";

const profileschema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone :String,
    bio : String,
    profileImage : String,
    socialLinks : {
        linkedin: String,
        twitter: String,
        facebook: String,
        instagram: String
    },

}, { timestamps: true });

const Profile = mongoose.model("Profile", profileschema);

export default Profile;
