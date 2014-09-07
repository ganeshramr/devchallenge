'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ganeshtest Schema
 */
var GaneshtestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ganeshtest name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ganeshtest', GaneshtestSchema);