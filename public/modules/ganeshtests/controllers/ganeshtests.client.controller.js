'use strict';

// Ganeshtests controller
angular.module('ganeshtests').controller('GaneshtestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ganeshtests',
	function($scope, $stateParams, $location, Authentication, Ganeshtests ) {
		$scope.authentication = Authentication;

		// Create new Ganeshtest
		$scope.create = function() {
			// Create new Ganeshtest object
			var ganeshtest = new Ganeshtests ({
				name: this.name
			});

			// Redirect after save
			ganeshtest.$save(function(response) {
				$location.path('ganeshtests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ganeshtest
		$scope.remove = function( ganeshtest ) {
			if ( ganeshtest ) { ganeshtest.$remove();

				for (var i in $scope.ganeshtests ) {
					if ($scope.ganeshtests [i] === ganeshtest ) {
						$scope.ganeshtests.splice(i, 1);
					}
				}
			} else {
				$scope.ganeshtest.$remove(function() {
					$location.path('ganeshtests');
				});
			}
		};

		// Update existing Ganeshtest
		$scope.update = function() {
			var ganeshtest = $scope.ganeshtest ;

			ganeshtest.$update(function() {
				$location.path('ganeshtests/' + ganeshtest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ganeshtests
		$scope.find = function() {
			$scope.ganeshtests = Ganeshtests.query();
		};

		// Find existing Ganeshtest
		$scope.findOne = function() {
			$scope.ganeshtest = Ganeshtests.get({ 
				ganeshtestId: $stateParams.ganeshtestId
			});
		};
	}
]);