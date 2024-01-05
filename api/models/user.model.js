import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "data:image/png;base64,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"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User