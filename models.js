const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const SessionSchema = new mongoose.Schema({
    userId: String,
    wpm: Number,
    accuracy: Number,
    totalErrors: Number,
    errorWords: [String],
    typingDurations: [Number],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
const Session = mongoose.model("Session", SessionSchema);

module.exports = { User, Session };