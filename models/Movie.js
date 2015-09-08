var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
	title: String,
	created: Date,
	rating: Number, //0 - 10 user rating,
	director: mongoose.Schema.Types.Mixed,
	actors: [{type: String}]
});

mongoose.model('Movie', MovieSchema);