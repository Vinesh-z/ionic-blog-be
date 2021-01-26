const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String },
    emailId: String,
    password: String,
    dob: Date,
    gender: { type: String, default: "male" },
    likedBlogs: [String],
    myBlogs: [String],
    role: { type: String, default: "normal" },
    about: { type: String },
    profile: { type: String, default: "empty" }
});

module.exports = mongoose.model('User', UserSchema);    