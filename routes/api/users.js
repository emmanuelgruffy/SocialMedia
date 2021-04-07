const express = require('express');
const config = require('config');
//to get back our jwtsecret

const router = express.Router();
//note how we now uses the router to route requests towards the backend

//importing User schema from models.
const User = require('../../models/User');

//importing gravatar:
const gravatar = require('gravatar');

//importing bcrypt in order to hash the user password
const bcrypt = require('bcryptjs');

//importing the express validator:
const { check, validationResult } = require('express-validator');

//json-web-token is a module that allows us to generate a unique token for each user that is signed in.
//this way we can easiliy evaluate and access the user data using this token.
const jwt = require('jsonwebtoken');

// @route  POST api/users
// @desc   Register route
// @access Public
//note the validation check done as the second argument in the post function.
//for example we are checking that the key 'name' is not empy, otherwise 'Name is required' will be prompted:
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {

    //Validate post request payload:
    // so here once validation is done we are assigning the validation result into an 'error' const.
    //if the errors is not empty we will send back a status code of 400 along with a json response containing the errors as an array.    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //notice we are using ASYNC so that will allow as to await for functions to get done - before executing the next ones.
    // all of the below actions are wrapped inside try catch:
    const { name, email, password } = req.body;
    try {
        //See if user exists already in the DB: it's enough to search by email as this is a unique value in the db (see User file in 'models')
        //notice that here we are not using the callback function - instead we are awating the response and assign it to a user variable.
        let user = await User.findOne({email: email});
        if(user) {
            //if usre already exists we will send back status 400 with proper message:
           return res.status(400).json({ errors: [{ msg: 'User already exists'}]})
        }
        //now if user is not found - we will get the user gravatar 
        //gravatar will just turn the new user mail into a gravatar:
        const avatar = gravatar.url(email, {
            s: '200', //s is the size
            r: 'pg', //r is the rating
            d: 'mm' // d is the default meaning to provide default icon as avatar.
        })

        //now finally we are creating the new user as the schema convention - and will store it to our database
        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypting the password - note that we imported bcrypt for that.
        //for using bcrypt we would also need to salt the password we are using bcrypt promise 
        //which takes time, therefore we want to await until promise is fullfilled.
        const salt = await bcrypt.genSalt(10);
        
        //now we are hashing the password:
        user.password = await bcrypt.hash(password, salt);

        //finally we are saving the user into the DB.
        await user.save();

        //assigning json-web-token:
        //first we get user id from the db:
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
    res.send('User route');
});

module.exports = router;