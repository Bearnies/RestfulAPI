const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var mysql = require('mysql');

var createConnection =  mysql.connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'bearnies',
        password: 'khanghi1',
        database: 'btcn06web'
});

createConnection.connect(function(error) {
    if (error) throw error;
    console.log("Connected to database!");
});


const addUser = async ({ name, password }) => {
    return User.create({ name, password });
};

//POST register
router.post('/register', function (req, res, next) {
    const {username, password} = req.body;
    let newUser = new User ({
        username: username,
        password: password
    });
    
    //Thêm người dùng
    addUser(newUser, (error, user) => {
        if (error) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, user, msg: 'User registered' });
        }
    });
});


//POST login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        
       req.login(user, {session: false}, (error) => {
           if (error) {
               res.send(error);
           }

           //Tạo web token cho nội dung đối tượng người dùng và trả về jwt
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

module.exports = router;