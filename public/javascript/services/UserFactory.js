(function() {
	"use strict";
	angular.module('app').factory('UserFactory', UserFactory);
	UserFactory.$inject = ['$q', '$http', '$window', "$rootScope"];

	function UserFactory($q, $http, $window, $rootScope) {
		var o = {};
		o.status = {};
	//	vm.status = $rootScope.user;

	var setToken = function(token) {
		localStorage.setItem("token", token);
	};

	var getToken = function(token) {
		return localStorage.token;
	};

	var isLoggedIn = function() {
		var token = getToken();
		if(token) {
			var payload = JSON.parse($window.atob(token.split(".")[1]));
			if(payload.exp > Date.now() / 1000) {
				return payload;
			}
			else {
				return ;
			}
		}
	};

	o.register = function(user) {
		var q = $q.defer();
		$http.post('/api/users/register', user).success(function(res) {
				// o.status.isLoggedIn = true;
				// o.status.username = user.username;
				q.resolve();
			});
		return q.promise;
	};

	o.login = function(user) {
		var q = $q.defer();
		$http.post('/api/users/login', user).success(function(res) {
			setToken(res.token);
			$rootScope._user = isLoggedIn();
			q.resolve();
		});
		return q.promise;
	};

	o.logout = function() {
		removeToken();
		$rootScope._user = isLoggedIn();
	};

	$rootScope._user = isLoggedIn();
	return o;
}
})();