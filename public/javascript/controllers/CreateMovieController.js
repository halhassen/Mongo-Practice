(function() {
	"use strict";
	angular.module('app').controller('CreateMovieController', CreateMovieController);
	CreateMovieController.$inject = ['HomeFactory', '$state'];

	function CreateMovieController(HomeFactory, $state) {
		var vm = this;
		vm.movie = {};
		vm.createMovie = function() {
			vm.movie.created = new Date(vm.movie.created + '-1-1');
			HomeFactory.createMovie(vm.movie).then(function() {
				$state.go('Home');
			});
		};
	}
})();