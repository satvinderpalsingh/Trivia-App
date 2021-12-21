const { Router } = require("express");
const {
    user_signup_post,
    user_signin
} = require('../controller/authController')

const router = Router();

router.post('/signup/user', user_signup_post);
router.post('/signin/user', user_signin);

module.exports = router;