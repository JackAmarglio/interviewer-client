import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    passwordHash: { type: String, required: true },
    isInterpreter: { type: Boolean, required: true },
    companyInfo: { type: String, required: false },
    address: { type: String, required: false },
    website: { type: String, required: false },
    contact: { type: String, required: false },
    emailConfirmed: { type: Boolean, required: true }
});

export const User = mongoose.model("reactUser", userSchema);
