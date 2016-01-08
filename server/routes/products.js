
var express = require('express');
var router = express.Router();

router.get('/products/:id', function(req, res){

    var data = new Array(10).fill('1');
    res.status(200).send(data);

});


module.exports = router;
