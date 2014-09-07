'use strict';

//Titles service used to communicate Titles REST endpoints
angular.module('artists').factory('AlbumTracks', ['$resource',
	function($resource) {
		return $resource('/albums/:albumId');
	}
]);