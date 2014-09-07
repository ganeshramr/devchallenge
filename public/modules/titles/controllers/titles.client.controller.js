'use strict';

// Titles controller
angular.module('titles').controller('TitlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Titles',
	function($scope, $stateParams, $location, Authentication, Titles ) {
		$scope.authentication = Authentication;

		// Create new Title
		$scope.create = function() {
			// Create new Title object
			var title = new Titles ({
				name: this.name
			});

			// Redirect after save
			title.$save(function(response) {
				$location.path('titles/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Title
		$scope.remove = function( title ) {
			if ( title ) { title.$remove();

				for (var i in $scope.titles ) {
					if ($scope.titles [i] === title ) {
						$scope.titles.splice(i, 1);
					}
				}
			} else {
				$scope.title.$remove(function() {
					$location.path('titles');
				});
			}
		};

		// Update existing Title
		$scope.update = function() {
			var title = $scope.title ;

			title.$update(function() {
				$location.path('titles/' + title._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Titles
		$scope.find = function() {
			$scope.titles = Titles.query();
					};

		$scope.incrementalSearch = function(){
			
	    	$scope.titles= Titles.query({name:$scope.titleName});
	    	
		
		};

		// Find existing Title
		$scope.findOne = function() {
			$scope.title = Titles.get({ 
				titleId: $stateParams.titleId
			});
		};
	}
]);