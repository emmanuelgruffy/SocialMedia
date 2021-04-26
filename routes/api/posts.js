const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }


});

// @route  GET api/posts
// @desc   GET all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
       const posts = await Post.find({}, (err, response) => { //we want all posts not just of one users
             let postsList = response.map(post => post.text); 
             //res.json(postsList); // if we want the posts only in array form   
        }).sort({ date: -1 }); //this is so that posts are sorted from newest to oldest.

        res.json(posts);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/:id
// @desc   GET post by post id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);

    } catch (error) {
        console.log(error.message);
        if (err.kind ==='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post by post id
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if(post.user.toString() !== req.user.id) { //we don't want to allow user deleting another user post
            return res.status(401).json({ msg: 'Action Unauthorzied' });
        }

        res.send('post deleted successfully');

    } catch (error) {
        console.log(error.message);
        if (error.kind ==='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        //check if the post already been liked by this user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
           return res.status(400).json( {msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        //check if the post has been liked - because we can't unlike a post which hasn't been liked before.
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
           return res.status(400).json( {msg: 'Post hasn\'t yet been liked' });
        }

        //create a new likes array without the liked one - as we want to unlike it.
        const newLikes = post.likes.filter( like => like.user.toString() !== req.user.id);
        post.likes = newLikes;

        await post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route  POST api/posts/comment/:post_id
// @desc   Create a new comment for a post
// @access Private
router.post('/comment/:post_id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try { 

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment = { 
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @desc   Delete a coment on a post
// @access Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //now pull out comment from the post, notice that the find methode here is not mongoose method, but plain js
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //make sure comment exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // make sure user is deleting his own comment.
        if(comment.user.toString() !== req.user.id) { 
            return res.status(401).json({ msg: 'Action Unauthorzied' });
        }

        const newComments = post.comments.filter(comment => comment.id !== req.params.comment_id)
        post.comments = newComments;
        await post.save();
        res.send('post deleted successfully');

    } catch (error) {
        console.log(error.message);
        if (error.kind ==='ObjectId'){
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;