'use strict';


angular.module('core').controller('HomeController', ['$scope','$http','$location','Authentication',
	function($scope,$http,$location,Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.demosignin = function() {
			    var credentials={username:'turnerdevc',password:'test123'};
				$http.post('/auth/signin', credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the title list page
				$location.path('/titles');
			}).error(function(response) {
				//New account is being created;
				credentials.firstName = 'Dev Challenge';
				credentials.lastName = 'Demo';
				credentials.email = 'demoprofile1@gmail.com';
				$http.post('/auth/signup', credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					// And redirect to the title list page
					$location.path('/titles');
				});
			});
		};
	}
]);
