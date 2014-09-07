'use strict';

// Titles controller
angular.module('artists').controller('AlbumsController', ['$scope', '$stateParams', '$location','AlbumTracks',
	function($scope, $stateParams, $location, AlbumTracks) {
		


		$scope.loadTracksByAlbum = function(){
			//alert('called'+$scope.artistName);
	     $scope.albumTracks= AlbumTracks.get({currentPage:1,albumId:$stateParams.albumId});
	     $scope.albumName = $location.search().name;
	     	    
		};

		

	}
]);