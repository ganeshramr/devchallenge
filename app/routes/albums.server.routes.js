'use strict';

/**
 * Module dependencies.
 */

var albums = require('../../app/controllers/albums');

module.exports = function(app) {
    // Article Routes
    app.route('/artists/:artistId/albums')
        .get(albums.listAlbums);

};