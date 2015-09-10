var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/register', function(req, res) {
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err, result) {
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "You messed up."});
		res.send();
	})
});

router.post('/login', function(req, res) {
	User.findOne({username: req.body.username})
	.exec(function(err, user) {
		if(err) return res.status(500).send({err: "Server has issues."});
		if(!user) return res.status(400).send({err: "User does not exist"});
		if(user.checkPassword(req.body.password)) {
			var token = { token: user.generateJWT() }
			console.log(token);
			return res.send(token);
		}
		else res.status(400).send({err: "Incorrect username and password combination."});
	});
});

module.exports = router;