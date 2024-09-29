/*
id string pk
subscriber ObjectId users
channel ObjectId users
createdAt Date
updatedAt Date 
*/

import mongoose, { Schema } from "mongoose"

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, // one who is SUBSCRIBING  
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId, // one to whom 'subscriber' is SUBSCRIBING
            ref: "User"
        }
    },
    { timestamp: true }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema)