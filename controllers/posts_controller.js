const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .then(post => {
            console.log('Post created successfully:', post);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in creating a post:', err);
            return res.status(500).json({ error: 'Internal Server Error'});
        });
};

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.redirect('back');
        }
        // .id means converting the object id(._id) into string
        // Check if the current user is the owner of the post
        if(post.user == req.user.id){
           await post.deleteOne();

           //Delete all comments associated with the post
           await Comment.deleteMany({ post: req.params.id });

           return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch (error) {
        console.error('Error in distroy method:', error);
        return res.redirect('back');
    }

};