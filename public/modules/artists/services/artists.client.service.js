'use strict';

//Titles service used to communicate Titles REST endpoints
angular.module('artists').factory('Artists', ['$resource',
	function($resource) {
		return $resource('/artists');
	}
]);