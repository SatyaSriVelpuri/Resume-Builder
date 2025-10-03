import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://satyasrivelpuri_db_user:resume123@cluster0.jx0cb39.mongodb.net/RESUME')
    .then(() => console.log("MongoDB connected"))
}
    