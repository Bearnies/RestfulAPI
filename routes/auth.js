const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

//POST register
router.post('/register', function (req, res, next) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user!' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});


//POST login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

           //Tạo web token cho nội dung đối tượng người dùng và trả về
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});
