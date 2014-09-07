'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ganeshtest = mongoose.model('Ganeshtest');

/**
 * Globals
 */
var user, ganeshtest;

/**
 * Unit tests
 */
describe('Ganeshtest Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			ganeshtest = new Ganeshtest({
				name: 'Ganeshtest Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return ganeshtest.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			ganeshtest.name = '';

			return ganeshtest.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Ganeshtest.remove().exec();
		User.remove().exec();

		done();
	});
});