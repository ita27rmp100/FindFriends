let express = require("express")
let router = express.Router()

/* GET home page. */
router.get('/:action?', function(req, res, next) {
    res.render('logSign');
  });
  
  module.exports = router;