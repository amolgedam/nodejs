import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please provide unique Username'],
        unique: [true, 'Username exist']
    },
    password: {
        type: String,
        require: [true, 'Please provide password'],
        unique: false
    },
    email: {
        type: String,
        require: [true, 'Please provide a unique email'],
        unique: true
    },
    firstname: { type: String },
    lastname: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
});

/* Users => db name in old pattern */
export default mongoose.model.Users || mongoose.model('User', UserSchema);
