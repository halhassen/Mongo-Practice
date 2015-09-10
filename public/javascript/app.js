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
		}).state('EditMovie', {
			url: '/Movie/Edit/:id',
			templateUrl: 'views/create_movie.html',
			controller: 'EditMovieController',
			controllerAs: 'vm'
		}).state('RegisterUser', {
			url: '/Register',
			templateUrl: 'views/register_user.html'
		}).state('LoginUser', {
			url: '/Login',
			templateUrl: 'views/login_user.html'
		}).state('MovieInfo', {
			url: '/Movie/:id',
			templateUrl: 'views/movie_info.html',
			controller: 'MovieDetailsController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
