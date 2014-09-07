'use strict';

//Titles service used to communicate Titles REST endpoints
angular.module('artists').factory('ArtistsAlbums', ['$resource',
	function($resource) {
		return $resource('/artists/:artistId/albums');
	}
]);