var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:mood?', function(req, res, next) {
  res.render('logSign');
});

module.exports = router;