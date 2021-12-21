const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'test secret', { // You can add your own secret phrase
        expiresIn: maxAge
    });
};

module.exports.user_signup_post = async(req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const user = await User.create(obj);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({
            success: true,
            token1: token,
            user
        });
    } catch (err) {
        res.status(400).json({ errors: err });

    }

}

module.exports.user_signin = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Please enter email and password");
        res.send("Please enter  email or password");
        return next();
    }
    const user = await User.findOne({ email }).select("+password");// in order to obtain password otherwise password filed wont be added to user obj
    console.log(user)
    if (!user) {
        console.log("Please enter correct email or password");
        res.send("Please enter correct email or password");
        return next();
    }
    if (user.password !== password) {
        console.log("Enter correct password");
        res.send("Please enter correct email or password");
        return next();
    }
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(token);
    res.status(201).json({
        success: true,
        token1: token,
        user
    });
}