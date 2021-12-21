const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your name must be longer than 6 characters"],
        select: false,//will not be retreived withouy .selects("password")
    },
}, { versionKey: false })


const User = mongoose.model('user', userSchema);

module.exports = User;