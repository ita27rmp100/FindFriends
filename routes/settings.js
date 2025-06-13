const express = require('express');
const router = express.Router();
const mysql = require("mysql")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("settings")
});

module.exports = router;
