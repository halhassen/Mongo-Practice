var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var jwt = require("express-jwt");

var auth = jwt({
	secret: "_secret_sauce",
	userProperty: "payload"
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});

router.param('id', function(req, res, next, id) {
	Movie.findOne({_id:id})
	.exec(function(err, movie) {
		if(err) return res.status(500).send({err: "Error inside the server."});
		if(!movie) return res.status(400).send({err: "That movie does not exist"});
		req.movie = movie;
		next();
	});
});


//GET all movies
router.get('/', function(req, res) {
	Movie.find({})
	.exec(function(err, movies) {
		console.log(movies);
		if(err) return res.status(500).send({err: "error getting all movies"});
		if(!movies) return res.status(500).send({err: "movies do not exist"});
		res.send(movies);
	});
});

//Get one movie
router.get('/:id', function(req, res) {
	res.send(req.movie);
});


router.post('/', auth, function(req, res) {
	var movie = new Movie(req.body);
	movie.save(function(err, result) {
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not create that movie."});
		res.send({_id: result._id});
	});
});

//Edit
//use req.body for the whole object
//Passed in _id: req._id to help find the object
router.put('/:id', function(req, res) {
	Movie.update({_id: req._id}, req.body).exec(function(err, result) {
		res.send();
	})
});

//When putting : on a router path, colon says what comes after : is a variable. like a guid
router.delete("/:id", function(req,res){
 Movie.remove({_id: req._id}) //_id is the property, req._id is the value
 .exec(function(err, movies){
 	if(err) return res.status(500).send({err: "error with getting all movies"});
 	if(!movies) return res.status(400).send({err:"movies do not exist"});
 	res.send(movies);
 });
});


module.exports = router;