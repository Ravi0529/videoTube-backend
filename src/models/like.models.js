/*
id string pk
video ObjectId videos
comment ObjectId comments
tweet ObjectId tweets
likedBy ObjectId users
createdAt Date
updatedAt Date
*/

import mongoose, { Scehma } from "mongoose"

const likeSchema = new Schema(
    {
        video: {
            type: Scehma.Types.ObjectId,
            ref: "Video"
        },
        comment: {
            type: Scehma.Types.ObjectId,
            ref: "Comment"
        },
        tweet: {
            type: Scehma.Types.ObjectId,
            ref: "Tweet"
        },
        likedBy: {
            type: Scehma.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

export const Like = mongoose.model("Like", likeSchema)