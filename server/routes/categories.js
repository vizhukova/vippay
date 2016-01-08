var CategoryController = require('../controllers/Category')
var express = require('express');
var router = express.Router();

router.get('/category', function(req, res){

    /*var data = new Array(10).fill('1');
    res.send(data);*/

    CategoryController.getAllCategories({}).then(function(categories){
        res.send(categories)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.get('/category/:id', function(req, res){

    CategoryController.getCurrentCategories().then(function(category){
        res.send(category)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.post('/category/new', function(req, res){

    /*var data = new Array(10).fill('1');
    res.send(data);*/

    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    CategoryController.newCategory({
        category: req.body.category,
    }).then(function(category){
        res.send(category)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});


module.exports = router;
