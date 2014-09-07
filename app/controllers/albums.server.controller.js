'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
var winston = require('winston');
var logger = new (winston.Logger)({
          'transports': [
          new (winston.transports.Console)(
          {
            'level': 'debug',
            'colorize': true
          }),
          new (winston.transports.File)(
          {
            'filename': 'logging-file.log'
          })]
        });

/**
 * List of albums
 */
exports.listAlbums = function(req, res) {

    var artistId = req.param('artistId');
    logger.info('Getting details of the album for artist id: ' + artistId);
    if (artistId) {

        logger.debug('On Page: ' + req.query.currentPage);
        // Search albums of artists
        var offsetCalculated = 0;
        var currentPage = 1;
        if (req.query.currentPage) {
            currentPage = req.query.currentPage;
        }
        if (Number(currentPage) !== 1) {
            offsetCalculated = ((currentPage - 1) * 10) + 1;
        }

        // Get albums by a certain artist
        spotifyApi.getArtistAlbums(artistId, {
                limit: 10,
                offset: offsetCalculated
            })
            .then(function(data) {
                logger.debug('Artist albums', data);
                res.jsonp(data);
            }, function(err) {
                logger.error(err);
            });

    }

};