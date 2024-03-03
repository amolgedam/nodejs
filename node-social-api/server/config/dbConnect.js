import mongoose from "mongoose";

export const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL);

        console.log(`database has been connected successfully`);
    } catch (error) {
        console.log(error);
    }
}