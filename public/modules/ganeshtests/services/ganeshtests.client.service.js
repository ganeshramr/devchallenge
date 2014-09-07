'use strict';

//Ganeshtests service used to communicate Ganeshtests REST endpoints
angular.module('ganeshtests').factory('Ganeshtests', ['$resource',
	function($resource) {
		return $resource('ganeshtests/:ganeshtestId', { ganeshtestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);