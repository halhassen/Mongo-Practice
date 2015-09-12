(function() {
	"use strict";
	angular.module('app').controller('NavbarController', NavbarController);
	NavbarController.$inject = ['$state', 'UserFactory', "$rootScope", "$stateParams"];

	function NavbarController($state, UserFactory, $rootScope, $stateParams) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;

		vm.register = function() {
			UserFactory.register(vm.user).then(function() {
				vm.user = {};
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				vm.status = $rootScope._user;
				$state.go('Home');
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go("Home");
		};

		vm.friends = function() {
			UserFactory.friendsList() 
			vm.status = $rootScope._user
			$state.go('FriendList')
		};
		//$stateParams gives access to the id passed
		vm.profilePage = function($stateParams) {
			console.log('profile')
			UserFactory.profilePage();
			vm.status = $rootScope._user
			$state.go('Profile')
		}

	}
})();