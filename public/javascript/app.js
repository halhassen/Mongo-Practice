(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('CreateMovie', {
			url: '/Create',
			templateUrl: 'views/create_movie.html',
			controller: 'CreateMovieController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
