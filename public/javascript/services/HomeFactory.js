(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		o.createMovie = function(movie) {
			var q = $q.defer();
			$http.post('/api/movies', movie).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

		return o;
	}
})();