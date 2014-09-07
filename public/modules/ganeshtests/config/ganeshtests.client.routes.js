'use strict';

//Setting up route
angular.module('ganeshtests').config(['$stateProvider',
	function($stateProvider) {
		// Ganeshtests state routing
		$stateProvider.
		state('listGaneshtests', {
			url: '/ganeshtests',
			templateUrl: 'modules/ganeshtests/views/list-ganeshtests.client.view.html'
		}).
		state('createGaneshtest', {
			url: '/ganeshtests/create',
			templateUrl: 'modules/ganeshtests/views/create-ganeshtest.client.view.html'
		}).
		state('viewGaneshtest', {
			url: '/ganeshtests/:ganeshtestId',
			templateUrl: 'modules/ganeshtests/views/view-ganeshtest.client.view.html'
		}).
		state('editGaneshtest', {
			url: '/ganeshtests/:ganeshtestId/edit',
			templateUrl: 'modules/ganeshtests/views/edit-ganeshtest.client.view.html'
		});
	}
]);