var CategoryController = require('../controllers/Category')
var express = require('express');
var router = express.Router();


router.get('/category/:id', function(req, res, next){
    console.log(req.params.id)
    CategoryController.getCurrentCategories(req.params.id).then(function(category){
        res.send(category)
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});

router.get('/category', function(req, res, next){

    CategoryController.getAllCategories(req.clientObj.id).then(function(categories){
        res.send(categories)
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});


router.post('/category', function(req, res, next){

    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    CategoryController.newCategory({
        name: req.body.category,
        user_id: req.clientObj.id
    }).then(function(category){
        res.send(category)
    }).catch(function(err){
        next(err);
    })

});

router.put('/category/:id', function(req, res, next) {

    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    })

    CategoryController.editCategory(req.body).then(function (category) {
        res.send(category)
    }).catch(function (err) {
        //res.status(400).send(err.errors)
        next(err)
    })
});

router.delete('/category/:id', function(req, res, next){

    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    CategoryController.deleteCategory(req.params.id).then(function(category){
        res.send(category)
    }).catch(function(err){
        next(err);
    })

});


module.exports = router;
