(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

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
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			var q = $q.defer();
			$http.post('/api/movies/', movie, auth).success(function(res) {
				console.log(res);
				q.resolve();
			});
			return q.promise;
		};

		o.editMovie = function(newMovie, oldMovie) {
			var q = $q.defer();
			$http.put('/api/movies/' + oldMovie._id, newMovie).success(function(res) {
				//o.movies.splice(o.movies.indexOf(oldMovie) - 1, 1, newMovie);
				q.resolve();
			});
			return q.promise;
		};

		o.deleteMovie = function(movie) {
			$http.delete('/api/movies/' + movie._id).success(function(res) {
			});
		};

		return o;
	}
})();