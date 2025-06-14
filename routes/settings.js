const express = require('express');
const router = express.Router();
const mysql = require("mysql")

/* GET home page. */
router.get('/:exten?', function(req, res, next) {
  if(req.session.login){
    res.render("settings")
  }
  else{
    res.redirect("/logsign")
  }
});


module.exports = router;
