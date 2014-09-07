'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Title = mongoose.model('Title'),
	_ = require('lodash');

/**
 * Create a Title
 */
exports.create = function(req, res) {
	var title = new Title(req.body);
	title.user = req.user;

	title.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(title);
		}
	});
};

/**
 * Show the current Title
 */
exports.read = function(req, res) {
	res.jsonp(req.title);
};

/**
 * Update a Title
 */
exports.update = function(req, res) {
	var title = req.title ;

	title = _.extend(title , req.body);

	title.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(title);
		}
	});
};

/**
 * Delete an Title
 */
exports.delete = function(req, res) {
	var title = req.title ;

	title.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(title);
		}
	});
};

/**
 * List of Titles
 */
exports.list = function(req, res) { 
	console.log('Listing is called');

	  if(req.query.name){
	  	   
	  	    var r = new RegExp(req.query.name,'i');
	  		Title.find({name:{$regex:r}}).sort('-created').populate('titleName').exec(function(err, titles) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log('titles from db'+titles);
				res.jsonp(titles);
			}
		});
	  } else {
	  	console.log('made it');
		  	Title.find().sort('-created').populate('titleName').exec(function(err, titles) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log(titles);
				res.jsonp(titles);
			}
		});
	}
};

/**
 * List of Titles by name
 */
exports.listByName = function(req, res) { 
	     console.log('The list by name is called');
	     Title.find(/titleName/).sort('-created').populate('user', 'displayName').exec(function(err, titles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(titles);
			
		}
	});
};

/**
 * Title middleware
 */
exports.titleByID = function(req, res, next, id) { Title.findById(id).populate('user', 'displayName').exec(function(err, title) {
		if (err) return next(err);
		if (! title) return next(new Error('Failed to load Title ' + id));
		req.title = title ;
		next();
	});
};

/**
 * Title authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.title.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};