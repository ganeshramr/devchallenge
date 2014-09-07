'use strict';

// Configuring the Articles module
angular.module('ganeshtests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Ganeshtests', 'ganeshtests', 'dropdown', '/ganeshtests(/create)?');
		//Menus.addSubMenuItem('topbar', 'ganeshtests', 'List Ganeshtests', 'ganeshtests');
		//Menus.addSubMenuItem('topbar', 'ganeshtests', 'New Ganeshtest', 'ganeshtests/create');
	}
]);