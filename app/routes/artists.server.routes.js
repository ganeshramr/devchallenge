'use strict';

/**
 * Module dependencies.
 */

 var artists = require('../../app/controllers/artists');

module.exports = function(app) {
	// Article Routes
	app.route('/artists')
		.get(artists.list);
		
};