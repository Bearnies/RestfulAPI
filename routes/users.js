const express = require('express');
const router = express.Router();

//GET users listing
router.get('/', function(req, res, next) {
  res.send('Respond with a resource');
});

//GET user's profile
router.get('/me', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;