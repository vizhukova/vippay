var express = require('express');
var router = express.Router();


router.get('/settings', function(req, res){


    res.send({link: `/partners/#auth/${req.user.id}`});

});



module.exports = router;
