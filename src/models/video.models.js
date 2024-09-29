/*
id string pk
owner ObjectId users
videoFile string
thumbnail string
title string
description string
duration number
views number
isPublished boolean
createdAt Date
updatedAt Date
*/

import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
    videoFile: {
        type: String, // cloudinary URl
        required: true
    },
    thumbnail: {
        type: String, // cloudinary URl
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    })

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)