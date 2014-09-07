'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Ganeshtest = mongoose.model('Ganeshtest'),
	_ = require('lodash');

/**
 * Create a Ganeshtest
 */
exports.create = function(req, res) {
	var ganeshtest = new Ganeshtest(req.body);
	ganeshtest.user = req.user;

	ganeshtest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ganeshtest);
		}
	});
};

/**
 * Show the current Ganeshtest
 */
exports.read = function(req, res) {
	res.jsonp(req.ganeshtest);
};

/**
 * Update a Ganeshtest
 */
exports.update = function(req, res) {
	var ganeshtest = req.ganeshtest ;

	ganeshtest = _.extend(ganeshtest , req.body);

	ganeshtest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ganeshtest);
		}
	});
};

/**
 * Delete an Ganeshtest
 */
exports.delete = function(req, res) {
	var ganeshtest = req.ganeshtest ;

	ganeshtest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ganeshtest);
		}
	});
};

/**
 * List of Ganeshtests
 */
exports.list = function(req, res) { Ganeshtest.find().sort('-created').populate('user', 'displayName').exec(function(err, ganeshtests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ganeshtests);
		}
	});
};

/**
 * Ganeshtest middleware
 */
exports.ganeshtestByID = function(req, res, next, id) { Ganeshtest.findById(id).populate('user', 'displayName').exec(function(err, ganeshtest) {
		if (err) return next(err);
		if (! ganeshtest) return next(new Error('Failed to load Ganeshtest ' + id));
		req.ganeshtest = ganeshtest ;
		next();
	});
};

/**
 * Ganeshtest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ganeshtest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};