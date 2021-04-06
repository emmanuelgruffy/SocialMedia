const express = require('express');
const router = express.Router();
//note how we now uses the router to route requests towards the backend

// @route  GET api/users
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;