'use strict';

//Setting up route
angular.module('albums').config(['$stateProvider',
	function($stateProvider) {
		// Albums state routing
		$stateProvider.
		state('albumTracks', {
			url: '/albums/:albumId',
			templateUrl: 'modules/albums/views/albums.tracks.client.view.html'
		});
	}
]);