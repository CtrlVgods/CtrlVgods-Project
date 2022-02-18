var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', (req, res, next)=> {
  res.render('../views/user/profile');
});

module.exports = router;
