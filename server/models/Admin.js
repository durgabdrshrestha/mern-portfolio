import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Admin name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Admin email is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Admin password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false, // Exclude password from query results by default
    },

},{timestamps: true});

// Create a model from the schema
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;