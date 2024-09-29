/*
id string pk
owner ObjectId users
videos ObjectId[] videos
name string
description string
createdAt Date
updatedAt Date
*/

import mongoose, { Scehma } from "mongoose"

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        videos: [
            {
                type: Scehma.Types.ObjectId,
                ref: "Video"
            }
        ],
        owner: {
            type: Scehma.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)