const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("user middlwware")
    if (token) {
        jwt.verify(token, 'test secret', async(err, decodedToken) => {
            //enter secret phrase entered in signup route  
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                // console.log(res.locals.user)
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
module.exports = {
    checkUser
};