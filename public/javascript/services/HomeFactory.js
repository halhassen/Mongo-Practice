(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}

		o.getMovie = function(id) {
			var q = $q.defer();
			$http.get('/api/movies/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.getMovies = function() {
			var q = $q.defer();
			$http.get('/api/movies').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.submitMovie = function(movie) {
			var q = $q.defer();
			$http.post('/api/movies/', movie, getAuth()).success(function(res) {
				console.log(res);
				q.resolve();
			});
			return q.promise;
		};

		o.editMovie = function(newMovie, oldMovie) {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			var q = $q.defer();
			$http.put('/api/movies/' + oldMovie._id, newMovie).success(function(res) {
				q.resolve();
			});
			return q.promise;
		};

		o.deleteMovie = function(movie) {
			$http.delete('/api/movies/' + movie._id).success(function(res) {
			});
		};

		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comments/', comment, getAuth()).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		};

		o.deleteComment = function(comment) {
			$http.delete('/api/comments/' + comment._id, getAuth()).success(function(res) {
				
			});
		};

		return o;
	}
})();