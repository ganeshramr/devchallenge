'use strict';

(function() {
	// Titles Controller Spec
	describe('Titles Controller Tests', function() {
		// Initialize global variables
		var TitlesController,
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

			// Initialize the Titles controller.
			TitlesController = $controller('TitlesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Title object fetched from XHR', inject(function(Titles) {
			// Create sample Title using the Titles service
			var sampleTitle = new Titles({
				name: 'New Title'
			});

			// Create a sample Titles array that includes the new Title
			var sampleTitles = [sampleTitle];

			// Set GET response
			$httpBackend.expectGET('titles').respond(sampleTitles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.titles).toEqualData(sampleTitles);
		}));

		it('$scope.findOne() should create an array with one Title object fetched from XHR using a titleId URL parameter', inject(function(Titles) {
			// Define a sample Title object
			var sampleTitle = new Titles({
				name: 'New Title'
			});

			// Set the URL parameter
			$stateParams.titleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/titles\/([0-9a-fA-F]{24})$/).respond(sampleTitle);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.title).toEqualData(sampleTitle);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Titles) {
			// Create a sample Title object
			var sampleTitlePostData = new Titles({
				name: 'New Title'
			});

			// Create a sample Title response
			var sampleTitleResponse = new Titles({
				_id: '525cf20451979dea2c000001',
				name: 'New Title'
			});

			// Fixture mock form input values
			scope.name = 'New Title';

			// Set POST response
			$httpBackend.expectPOST('titles', sampleTitlePostData).respond(sampleTitleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Title was created
			expect($location.path()).toBe('/titles/' + sampleTitleResponse._id);
		}));

		it('$scope.update() should update a valid Title', inject(function(Titles) {
			// Define a sample Title put data
			var sampleTitlePutData = new Titles({
				_id: '525cf20451979dea2c000001',
				name: 'New Title'
			});

			// Mock Title in scope
			scope.title = sampleTitlePutData;

			// Set PUT response
			$httpBackend.expectPUT(/titles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/titles/' + sampleTitlePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid titleId and remove the Title from the scope', inject(function(Titles) {
			// Create new Title object
			var sampleTitle = new Titles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Titles array and include the Title
			scope.titles = [sampleTitle];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/titles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTitle);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.titles.length).toBe(0);
		}));
	});
}());