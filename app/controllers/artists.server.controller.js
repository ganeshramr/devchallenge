'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

/**
 * List of artists
 */
exports.list = function(req, res) {

    if (req.query.name) {
        console.log('Getting details of the artist by name: ' + req.query.name);
        console.log('On Page: ' + req.query.currentPage);
        // Search artists whose name contains 'Love
        var offsetCalculated = 0;
        if (Number(req.query.currentPage) !== 1) {
            offsetCalculated = ((req.query.currentPage - 1) * 10) + 1;
        }
        spotifyApi.searchArtists(req.query.name, {
                limit: 10,
                offset: offsetCalculated
            })
            .then(function(data) {
                console.log('Search artists by name'+req.query.name, data);
                res.jsonp(data);
            }, function(err) {
                console.error(err);
            });
    }

    if (req.query.id) {
        console.log('Getting details of the artist by Id');
        spotifyApi.getArtist(req.query.id)
            .then(function(data) {
                console.log('Artist information', data);
                res.jsonp(data);
            }, function(err) {
                console.error(err);
            });
    }

    if (!req.query.id && !req.query.name) {
        res.jsonp({});
    }
};