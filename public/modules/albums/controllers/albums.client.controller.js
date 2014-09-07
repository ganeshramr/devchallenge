'use strict';

// Titles controller
angular.module('artists').controller('AlbumsController', ['$scope', '$stateParams', '$location', 'AlbumTracks', '$rootScope',
    function($scope, $stateParams, $location, AlbumTracks, $rootScope) {



        $scope.loadTracksByAlbum = function() {
            //alert('called'+$scope.artistName);
            $scope.albumTracks = AlbumTracks.get({
                currentPage: 1,
                albumId: $stateParams.albumId
            });
            $scope.albumName = $location.search().name;

        };

        $scope.addToGlobalFavList = function(id, key) {
            if (!$rootScope.globalFavs) {
                $rootScope.globalFavs = {
                    'artists': [],
                    'albums': [],
                    'tracks': []
                };
            }
            if (key === 'tracks') {
                $rootScope.globalFavs.tracks.push(id);
            }
            console.log(JSON.stringify($rootScope.globalFavs));
        };



    }
]);