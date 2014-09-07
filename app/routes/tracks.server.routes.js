'use strict';

/**
 * Module dependencies.
 */

 var tracks = require('../../app/controllers/tracks');

module.exports = function(app) {
	// Article Routes
	app.route('/albums/:albumId')
		.get(tracks.listTracks);
		
};