'use strict';

//Titles service used to communicate Titles REST endpoints
angular.module('titles').factory('Titles', ['$resource',
	function($resource) {
		return $resource('titles/:titleId', { titleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);