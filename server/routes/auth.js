var express = require('express');
var router = express.Router();

router.get('/check', function(req, res){

    //res.status(200).send('ok')
    res.status(401).send('not ok')

});


module.exports = router;