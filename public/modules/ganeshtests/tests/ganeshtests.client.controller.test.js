'use strict';

(function() {
	// Ganeshtests Controller Spec
	describe('Ganeshtests Controller Tests', function() {
		// Initialize global variables
		var GaneshtestsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Ganeshtests controller.
			GaneshtestsController = $controller('GaneshtestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ganeshtest object fetched from XHR', inject(function(Ganeshtests) {
			// Create sample Ganeshtest using the Ganeshtests service
			var sampleGaneshtest = new Ganeshtests({
				name: 'New Ganeshtest'
			});

			// Create a sample Ganeshtests array that includes the new Ganeshtest
			var sampleGaneshtests = [sampleGaneshtest];

			// Set GET response
			$httpBackend.expectGET('ganeshtests').respond(sampleGaneshtests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ganeshtests).toEqualData(sampleGaneshtests);
		}));

		it('$scope.findOne() should create an array with one Ganeshtest object fetched from XHR using a ganeshtestId URL parameter', inject(function(Ganeshtests) {
			// Define a sample Ganeshtest object
			var sampleGaneshtest = new Ganeshtests({
				name: 'New Ganeshtest'
			});

			// Set the URL parameter
			$stateParams.ganeshtestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ganeshtests\/([0-9a-fA-F]{24})$/).respond(sampleGaneshtest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ganeshtest).toEqualData(sampleGaneshtest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ganeshtests) {
			// Create a sample Ganeshtest object
			var sampleGaneshtestPostData = new Ganeshtests({
				name: 'New Ganeshtest'
			});

			// Create a sample Ganeshtest response
			var sampleGaneshtestResponse = new Ganeshtests({
				_id: '525cf20451979dea2c000001',
				name: 'New Ganeshtest'
			});

			// Fixture mock form input values
			scope.name = 'New Ganeshtest';

			// Set POST response
			$httpBackend.expectPOST('ganeshtests', sampleGaneshtestPostData).respond(sampleGaneshtestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ganeshtest was created
			expect($location.path()).toBe('/ganeshtests/' + sampleGaneshtestResponse._id);
		}));

		it('$scope.update() should update a valid Ganeshtest', inject(function(Ganeshtests) {
			// Define a sample Ganeshtest put data
			var sampleGaneshtestPutData = new Ganeshtests({
				_id: '525cf20451979dea2c000001',
				name: 'New Ganeshtest'
			});

			// Mock Ganeshtest in scope
			scope.ganeshtest = sampleGaneshtestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ganeshtests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ganeshtests/' + sampleGaneshtestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ganeshtestId and remove the Ganeshtest from the scope', inject(function(Ganeshtests) {
			// Create new Ganeshtest object
			var sampleGaneshtest = new Ganeshtests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ganeshtests array and include the Ganeshtest
			scope.ganeshtests = [sampleGaneshtest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ganeshtests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGaneshtest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ganeshtests.length).toBe(0);
		}));
	});
}());