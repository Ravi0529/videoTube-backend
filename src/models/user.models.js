/*
id string pk
username string
email string
fullName string
avatar string
coverImage string
watchHistory ObjectId[] videos
password string
refreshToken string
createdAt Date
updatedAt Date
*/

import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary URL
            require: true
        },
        coverImage: {
            type: String, // cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"],
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true } // this is for createdAt and update4dAt
)

// encrypting the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

// check the password again while logging in by hashing
userSchema.methods.isPasswordCorrect - async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generating access token
userSchema.methods.generateAccessToken = function () {
    // short lived token
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

// generating refresh token
userSchema.methods.generateRefreshToken = function () {
    // short lived token
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const User = mongoose.model("User", userSchema)