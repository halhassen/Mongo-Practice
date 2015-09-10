(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory'];

	function HomeController(HomeFactory) {
		var vm = this;
		vm.title = 'Welcome to our App!';

		HomeFactory.getMovies().then(function(res) {
			vm.movies = res;
			console.log(res);
		});

		vm.startEdit = function() {

		};

		vm.deleteMovie = function(movie) {
			vm.movies.splice(vm.movies.indexOf(movie), 1);
			HomeFactory.deleteMovie(movie)
		}
	}
})();