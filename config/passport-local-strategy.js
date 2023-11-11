const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true // ! To pass the request to the callback function
    },
    function(email, password, done) {
        // Find a user and establish the identity
        // If not found or password is wrong then return done(null, false)
        // If found then return done(null, user)

        User.findOne({ email: email })
            .then((user) => {
                if (!user || user.password !== password) {
                    console.log('Invalid user/ Password');
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            })
            .catch((err) => {
                console.log('Error in finding user --> passport');;
                return done(err);
            });
    }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then((user) => {
            if (!user) {
                return done(null, false); // User not found
            }
            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding user --> Passport');
            return done(err);
        });
});


// passport.checkAuthentication = (req,res,next)=>{
//     // ! IF the user is signed in, then pass on the request to the next function(controller's action)
//     if(req.isAuthenticated()){
//         return next();
//     }
//     return res.redirect('/users/login');
// }

// passport.setAuthenticatedUser = (req,res,next)=>{
//     if(req.isAuthenticated()){
//         // req.user contains the current signed in user from the session cookies and it just contains the user for views. 
//         res.locals.user = req.user;
//     }
//     next();
// }

module.exports = passport;
