const User = require('../models/userModel')
const Question = require('../models/questionsModel')


module.exports.quiz = async(req, res) => {
    const user_id = res.locals.user._id
    const { question2, question3 } = req.body

    Question.create({
        user: user_id,
        question2: question2,
        question3: question3
    }, (err, question) => {
        if (err) {
            res.send("some error occured")
        } else {
            res.send({
                message: "quiz done",
                question
            })
        }
    })
}
module.exports.quizHistory = async(req, res) => {
    const user_id = res.locals.user._id
    const user_name = res.locals.user.name
    const playedGames = await Question.find({ user: user_id })
    if (playedGames) {
        res.send({
            message: "found",
            name:user_name,
            playedGames
        })
    } else {
        res.send({
            message: "not found"
        })

    }
}
