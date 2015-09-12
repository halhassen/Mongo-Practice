var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MovieComment = mongoose.model('MovieComment');
var Movie = mongoose.model('Movie');
var jwt = require('express-jwt');
var auth = jwt({
	'userProperty': 'payload',
	'secret': '_secret_sauce'
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});

router.post('/', auth, function(req, res) {
	var comment = new MovieComment(req.body);
	comment.created = new Date();
	comment.user = req.payload.id;
	comment.save(function(err, result) {
		if (err) return res.status(500).send({
			err: "There is a problem"
		});
			if (!result) return res.status(400).send({
				err: "Could not create comment"
			});
				Movie.update({ _id: comment.movie}, {$push: {
					comments: {
						_id: result._id
					}
				}}, function(err, movie) {
					if(err) return res.status(500).send({err: "there was an error"});
					if(!movie) return res.status(400).send({err: "this error should never happen"});
					MovieComment.findOne({ _id : result._id }).populate("user")
					.exec(function(err, comment) {
						res.send(comment);
					})
				})
			});
});

router.delete("/:id", function(req,res){
 MovieComment.remove({_id: req._id}) //_id is the property, req._id is the value
 .exec(function(err, comment){
 	if(err) return res.status(500).send({err: "error with getting all comments"});
 	if(!comment) return res.status(400).send({err:"comments do not exist"});
 	res.send(comment);
 });
});


module.exports = router;