const User = require('../models/user')
module.exports.profile = function(req, res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id)
    .then(user => {
        if(user){
            return res.render('user_profile',{
                title: "Wonder Profile",
                user: user
            });
        }else {
            return res.redirect('/users/sign-in');
        }
    })
    .catch(err => {
        console.log('Error in Finding user by Id:', err);
        return res.redirect('/users/sign-in');
    });
   } else {
        return res.redirect('/users/sign-in');
   }
};
module.exports.signUp = function(req, res){
    return res.render('user_signUp', {
        title: 'User Sign up'
    })
}
module.exports.signIn = function(req, res){
    return res.render('user_sigin', {
        title: ' User Sign In '
    })
}
module.exports.signOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
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
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.redirect("back");
        }
        // handle password which doesn't match
        if(user.password !== req.body.password){
            return res.redirect("back");
        }

        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    })
    .catch(error => {
        console.log('Error in finding user in signing in:', err)
        return res.redirect('back');
    });
}
