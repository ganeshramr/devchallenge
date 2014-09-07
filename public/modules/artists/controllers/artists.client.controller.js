'use strict';

// Titles controller
angular.module('artists').controller('ArtistsController', ['$scope', '$stateParams', '$location','Artists','ArtistsAlbums',
	function($scope, $stateParams, $location, Artists,ArtistsAlbums ) {
		
		
        var nextPage = 1;
        var nextAlbumPage = 1;
		$scope.incrementalSearch = function(){
			//alert('called'+$scope.artistName);
	     var artistList = Artists.get({name:$scope.artistName,currentPage:1});
         artistList.$promise.then(function(data) {
				//console.log('Data for '+nextPage +JSON.stringify(data));
      			 $scope.artistsList = data;

   			});
	     
	     nextPage = 1;	    
		};

		$scope.loadAlbumsByArtist = function(){
			//alert('called'+$scope.artistName);
	     $scope.artistName= $location.search().artistName;	
	     $scope.albumList= ArtistsAlbums.get({currentPage:1,artistId:$stateParams.artistId});
	   	 nextAlbumPage = 1;
	     	    
		};

		$scope.myPagingFunction = function(){
			 nextPage += 1;
			
			 if ( $scope.artistsList.artists.next !== null ){
				var newList = Artists.get({name:$scope.artistName,currentPage:nextPage});
				newList.$promise.then(function(data) {
					//console.log('Data for '+nextPage +JSON.stringify(data));
	      			 $scope.artistsList.artists.items = $scope.artistsList.artists.items.concat(data.artists.items);
	      			 $scope.artistsList.artists.next = data.artists.next;


	   			});
			}
		
		};

		$scope.myPagingFunctionForAlbums = function(){
			 nextAlbumPage += 1;
			 console.log($scope.albumList.next);
			 if ( $scope.albumList.next !== null ){
				var newList = ArtistsAlbums.get({currentPage:nextAlbumPage,artistId:$stateParams.artistId});
	   
				newList.$promise.then(function(data) {
					//console.log('Data for '+nextPage +JSON.stringify(data));
	      			 $scope.albumList.items = $scope.albumList.items.concat(data.items);
	      			 $scope.albumList.next = data.next;

	   			});
			}
		
		};

		

	}
]);