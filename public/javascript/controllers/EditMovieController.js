(function() {
	'use strict';
	angular.module('app').controller('EditMovieController', EditMovieController);
	EditMovieController.$inject = ["$state", "$stateParams", "HomeFactory"];

	function EditMovieController($state, $stateParams, HomeFactory) {
		var vm = this;
		if(!$stateParams.id) state.go('Home');
		HomeFactory.getMovie($stateParams.id).then(function(res) {
			vm.movie = res;
			vm.movieCopy = angular.copy(res);
		}, function() {
			$state.go('EditMovie');
		});


		vm.submitMovie = function() {
			HomeFactory.editMovie(vm.movie, vm.movieCopy).then(function(res) {
				$state.go('Home');
			})
		};
	}
})();