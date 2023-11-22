const User = require('../models/user')
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
};
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_signUp', {
        title: 'User Sign up'
    })
}
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sigin', {
        title: ' User Sign In '
    })
}

module.exports.create = function(req, res){
    if (req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user){
                return User.create(req.body);
            } else {
                return Promise.reject('User already exists');
            }
        })
        .then(newUser => {
            return res.redirect('/users/sign-in');
        })
        .catch(err => {
            console.log('Error:', err);
            return res.redirect('back');
        });
};

module.exports.createSession = function(req, res){
    //Todo later
    return res.redirect('/');
}
module.exports.signOut = function(req, res, callback) {
    req.logout(function(err) {
        if (err) {
            // Handle error, if any
            console.error('Error during logout:', err);
            return callback(err);
        }

        // Redirect after successful logout
        return callback(null, res.redirect('/'));
    });
};
