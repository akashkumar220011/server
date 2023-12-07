const Post = require('../models/post')
module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).exec();

        res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};