const express = require('express');
const router = express.Router();
const mysql = require("mysql")

let connection = mysql.createConnection({
  password:"",
  user:"root",
  host:"127.0.0.1",
  database:"FindFriends"
}) 

/* GET home page. */
router.get('/', function(req, res, next) {
  let friendsList = ''
  if(req.session.login){
    connection.query(
      `select username,img,gender,country,link,langs,topics from users`,
      (err,result,fields)=>{
        for (let i = 0; i < result.length; i++) {
          let langs = JSON.parse(result[i].langs)
          let topics = JSON.parse(result[i].topics)
          friendsList = `
          <suggested-friend 
            img="/images/${result[i].img}"
            username="${result[i].username}"
            gender="${result[i].gender}"
            country="${result[i].country}"
            langs="${langs.join()}"
            intr1="${topics[0]}"
            intr2="${topics[1]}"
            intr3="${topics[2]}"
            contact="${result[i].link}"
          >
          </suggested-friend>\n`
        }
        res.render("index",{friendsList})
      }
    )
  }
  else res.redirect("/logsign")
});

module.exports = router;
