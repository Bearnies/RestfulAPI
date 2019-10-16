const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    }, 

    function (username, password, cb) {
        //Gọi DB lưu trữ nếu đối tượng người dùng được định dạng và chuẩn bị được lưu trữ trong jwt
        return UserModel.findOne({username, password})
        .then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect username or password.'});
            }
            return cb(null, user, {message: 'Logged in successfully'});
        })
        .catch(error => cb(error));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
    },
    
    function (jwtPayload, cb) {
        //Tìm người dùng trong db
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(error => {
                return cb(error);
            });
    }
));