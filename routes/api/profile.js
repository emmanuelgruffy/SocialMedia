const express = require('express');
const router = express.Router();
//note how we now uses the router to route requests towards the backend

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');


// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }) //the requested user id equal to the user field in Profile (which also hold id) 
            .populate('user', ['name', 'avatar']); //populate method will populate our profile var with data from 'user' collection with name and avatar fields     

        if (!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});

// @route  POST api/profile/
// @desc   create or update user profile
// @access Private
router.post('/', [auth,
    [check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()]],
    async (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       } 

       //now we are deconstructing the req.body with all the profile fields arrived in the json payload
       const {
           company,
           website,
           location,
           bio,
           status,
           githubusername,
           skills,
           youtube,
           facebook,
           twitter,
           instagram,
           linkedin
       } = req.body;

       //Build profile object - now we store these fields in our DB:
       const profileFields = {};
       profileFields.user = req.user.id;

       if (company) profileFields.company = company;
       if (website) profileFields.website = website;
       if (location) profileFields.location = location;
       if (bio) profileFields.bio = bio;
       if (status) profileFields.status = status;
       if (githubusername) profileFields.githubusername = githubusername;
       if (skills) {
           profileFields.skills = skills.split(',').map(skill => skill.trim());
           //we are splitting the skills by comma so turning it into an array.
           //then we map over it and trim - so that all spaces are removed.
       }
       //Build social object, which is an object inside profileFields object.
       profileFields.social = {};
       if (youtube) profileFields.social.youtube = youtube;
       if (facebook) profileFields.social.facebook = facebook;
       if (twitter) profileFields.social.twitter = twitter;
       if (instagram) profileFields.social.instagram = instagram;
       if (linkedin) profileFields.social.linkedin = linkedin;

       try {
           //we want to check if user profile already exists
           //in case it exists, we will update it, if not - we create from scratch:
           let profile = await Profile.findOne({ user: req.user.id });

           if (profile) {
               //Update:
               profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
               return res.json(profile);
           }

           //if not exist - Create: 
           profile = new Profile(profileFields);
           await profile.save();
           res.json(profile);

       } catch (error) {
           console.log(error.message);
           res.status(500).send('Server Error');
       }

    });


// @route  GET api/profile/
// @desc   GET all profiles
// @access Public
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/profile/user/:user_id
// @desc   GET all profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile){
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error')
    }
})

// @route  DELETE api/profile/
// @desc   Delete profile, user & posts
// @access Private
router.delete("/", auth, async (req, res) => {
    try {
        // @todo - remove user posts
        
        //Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        
        //Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User and Profile deleted'})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;