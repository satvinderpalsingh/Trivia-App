const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question2: {
        type: String,
        required: [true, "Please enter best cricketer in the world"],
    },
    question3: {
        type: [String],
        required: [true, "Please enter colors in the Indian national flag"],
    },
    gameDate: {
        type: Date,
        required: true,
        default: Date.now
    },
}, { versionKey: false })


const Question = mongoose.model('question', questionSchema);

module.exports = Question;