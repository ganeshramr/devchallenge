'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var titles = require('../../app/controllers/titles');

	// Titles Routes
	app.route('/titles')
		.get(titles.list)
		.post(users.requiresLogin, titles.create);

	app.route('/titles/:titleId')
		.get(titles.read)
		.put(users.requiresLogin, titles.hasAuthorization, titles.update)
		.delete(users.requiresLogin, titles.hasAuthorization, titles.delete);


	// Finish by binding the Title middleware
	app.param('titleId', titles.titleByID);
	
};