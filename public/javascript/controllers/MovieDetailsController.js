(function() {
	"use strict";
	angular.module('app').controller('MovieDetailsController', MovieDetailsController);
	MovieDetailsController.$inject = ['HomeFactory', '$state', '$stateParams'];

	function MovieDetailsController(HomeFactory, $state, $stateParams) {
		var vm = this;

		if (!$stateParams.id) $state.go('Home');
		else HomeFactory.getMovie($stateParams.id).then(function(res) {
			vm.movie = res;
		});

			vm.createComment = function() {
				var comment = {
					body: vm.newComment,
					movie: $stateParams.id
				};
				HomeFactory.createComment(comment).then(function(res) {
					vm.newComment = '';
					vm.movie.comments.push(res);
				})
			};

			vm.deleteComment = function(comment) {
				vm.movie.comments.splice(vm.movie.comments.indexOf(comment), 1);
				HomeFactory.deleteComment(comment);
				
			}
		}
	})();