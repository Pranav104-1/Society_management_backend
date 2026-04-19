import mongoose from "mongoose";

const webchatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}); 

export const WebChat = mongoose.model("WebChat", webchatSchema, "webchats");