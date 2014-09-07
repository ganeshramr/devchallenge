'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ganeshtests = require('../../app/controllers/ganeshtests');

	// Ganeshtests Routes
	app.route('/ganeshtests')
		.get(ganeshtests.list)
		.post(users.requiresLogin, ganeshtests.create);

	app.route('/ganeshtests/:ganeshtestId')
		.get(ganeshtests.read)
		.put(users.requiresLogin, ganeshtests.hasAuthorization, ganeshtests.update)
		.delete(users.requiresLogin, ganeshtests.hasAuthorization, ganeshtests.delete);

	// Finish by binding the Ganeshtest middleware
	app.param('ganeshtestId', ganeshtests.ganeshtestByID);
};