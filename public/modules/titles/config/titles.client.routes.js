'use strict';

//Setting up route
angular.module('titles').config(['$stateProvider',
	function($stateProvider) {
		// Titles state routing
		$stateProvider.
		state('listTitles', {
			url: '/titles',
			templateUrl: 'modules/titles/views/list-titles.client.view.html'
		}).
		state('createTitle', {
			url: '/titles/create',
			templateUrl: 'modules/titles/views/create-title.client.view.html'
		}).
		state('viewTitle', {
			url: '/titles/:titleId',
			templateUrl: 'modules/titles/views/view-title.client.view.html'
		}).
		state('editTitle', {
			url: '/titles/:titleId/edit',
			templateUrl: 'modules/titles/views/edit-title.client.view.html'
		});
	}
]);