'use strict';

// Titles controller
angular.module('artists').controller('ArtistsController', ['$scope', '$stateParams', '$location', 'Artists', 'ArtistsAlbums', '$rootScope', '$timeout',
    function($scope, $stateParams, $location, Artists, ArtistsAlbums, $rootScope, $timeout) {


        var nextPage = 1;
        var nextAlbumPage = 1;
        var callCounter = 1;
        var busyForArtists = false;
        var busyForAlbums = false;
        var valueAlreadySet = false;
        
        $scope.incrementalSearch = function() {
            valueAlreadySet = false;
            setTimeout(function() {
                if (valueAlreadySet) {
                    return;
                }
                valueAlreadySet = true;
                //alert('called'+$scope.artistName);
                var artistList = Artists.get({
                    name: $scope.artistName,
                    currentPage: 1
                });
                artistList.$promise.then(function(data) {
                    //console.log('Data for '+nextPage +JSON.stringify(data));
                    $scope.artistsList = data;
                });
                nextPage = 1;
            }, 500);



        };

        $scope.loadAlbumsByArtist = function() {
            //alert('called'+$scope.artistName);
            $scope.artistName = $location.search().artistName;
            $scope.albumList = ArtistsAlbums.get({
                currentPage: 1,
                artistId: $stateParams.artistId
            });
            nextAlbumPage = 1;

        };

        $scope.myPagingFunction = function() {
            if (busyForArtists) {
                return;
            }
            busyForArtists = true;
            nextPage += 1;
            callCounter = callCounter + 1;
            console.log('called' + callCounter);
            if ($scope.artistsList && $scope.artistsList.artists && $scope.artistsList.artists.next !== null) {
                var newList = Artists.get({
                    name: $scope.artistName,
                    currentPage: nextPage
                });
                newList.$promise.then(function(data) {
                    //console.log('Data for '+nextPage +JSON.stringify(data));
                    $scope.artistsList.artists.items = $scope.artistsList.artists.items.concat(data.artists.items);
                    $scope.artistsList.artists.next = data.artists.next;
                    busyForArtists = false;

                });
            } else {
                console.log('but skipped');
            }

        };

        $scope.myPagingFunctionForAlbums = function() {
            //console.log('condition'+ $scope.albumList && $scope.albumList.items && $scope.albumList.next !== null);
            //console.log('busy'+busyForAlbums);
            if (busyForAlbums) {
                return;
            }
            busyForAlbums = true;
            nextAlbumPage += 1;

            callCounter = callCounter + 1;
            console.log('called' + callCounter);
            if ($scope.albumList.next !== null) {
                var newList = ArtistsAlbums.get({
                    currentPage: nextAlbumPage,
                    artistId: $stateParams.artistId
                });

                newList.$promise.then(function(data) {
                    //console.log('Data for '+nextPage +JSON.stringify(data));
                    $scope.albumList.items = $scope.albumList.items.concat(data.items);
                    $scope.albumList.next = data.next;
                    busyForAlbums = false;

                });
            }

        };

        $scope.addToGlobalFavList = function(id, key) {

            if (!$rootScope.globalFavs) {
                $rootScope.globalFavs = {
                    'artists': [],
                    'albums': [],
                    'tracks': []
                };
            }
            if (key === 'albums') {
                $rootScope.globalFavs.albums.push(id);
            } else if (key === 'artists') {

                $rootScope.globalFavs.artists.push(id);
            } else if (key === 'tracks') {
                $rootScope.globalFavs.tracks.push(id);
            }
            console.log(JSON.stringify($rootScope.globalFavs));
        };


    }
]);