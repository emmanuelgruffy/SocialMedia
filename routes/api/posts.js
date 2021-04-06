const express = require('express');
const router = express.Router();
//note how we now uses the router to route requests towards the backend

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;