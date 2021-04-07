const express = require('express');
const router = express.Router();
//note how we now uses the router to route requests towards the backend

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @route  GET api/auth
// @desc   Test route
// @access Public

//IMPORTANT - see the second argument - auth.
//this is actually validating that there is a valid jwt token along with the user who tries to log into our application.
//the validation is done using a middleware called auth see that file and how the validtion is done exactly.
router.get('/', auth, async (req, res) => {
    try {
        //remember that our user is decoded in the auth process - so we can access it through our mongoose:
        //we also specifies 'select' to return data with password NOT INCLUDED:
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});


// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
//this code is similar to 'usres' only here we are logging in a user instead of registering a new one.
//so the validations are a bit different
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user) {
            //if usre doesn't exist we send invalid credentials:
           return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }

        const isMAtch = await bcrypt.compare(password, user.password);

        if (!isMAtch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }

        const payload = {
            user: { id: user.id } 
        }

        //this is how we sign a user with its unique token.
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            console.log(token);
            return res.json({ token });  
        });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    

    //remember that in order to see req.body you need to initialize app.use(express.json({extended: true/false}))
    //be sure to test this with Postman: add the header 'Content-Type' : application/json  ; and add body 'raw' json payload of some kind 
    console.log(req.body);
    
});

module.exports = router;