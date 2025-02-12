var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:chatwith?', function(req, res, next) {
  let formName
  if (req.session.tempname == undefined){
    formName = `<div class="row justify-content-center align-items-center text-center">
                      <form class="card bg-light shadow" action="/" method="post">
                          <div class="card-body p-3">
                              <div class="input-group mb-3">
                                  <div class="input-group-append InputTitle">
                                      <span class="input-group-text" id="name">Name</span>
                                  </div>
                                  <input type="text" maxlength="30" placeholder="Temporary name" name="username" class="form-control">
                              </div>
                          </div>
                          <div class="card-footer justify-content-center log">
                              <input type="submit" value="start" class="btn btn-success text-light">
                          </div>
                      </form>
                    </div>`
  }
  else{
    formName = ''
  }
  res.render("index",{
    formName
  })
});

module.exports = router;