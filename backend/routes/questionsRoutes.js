const { Router } = require("express");
const {
    quiz,
    quizHistory
} = require('../controller/questionsController')

const {checkUser}=require('../middleware/authMiddleware')
const router = Router();

router.post('/quize', checkUser,quiz);
router.get('/quize/history', checkUser,quizHistory);

module.exports = router;