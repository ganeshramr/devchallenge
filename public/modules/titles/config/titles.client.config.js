'use strict';

// Configuring the Articles module
angular.module('titles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Titles', 'titles', 'dropdown', '/titles(/create)?');
		Menus.addSubMenuItem('topbar', 'titles', 'List Titles', 'titles');
		Menus.addSubMenuItem('topbar', 'titles', 'New Title', 'titles/create');
	}
]);