const express = require('express');
const router = express.Router();
//note how we now uses the router to route requests towards the backend

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;