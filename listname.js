var express = require('express');
var router = express.Router();


router.get('/user-list', function(req, res, next) {
  
    res.render('user-list', { title: 'User List', userData: {'data1':"tytsss"}});
});
module.exports = router;