
var express = require('express');
var router = express.Router();

router.get('/category', function(req, res){

    var data = new Array(10).fill('1');
    res.send(data);

});


module.exports = router;
