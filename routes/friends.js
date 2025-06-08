var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:chatwith?', function(req, res, next) {
  res.render("friends")
});

module.exports = router;