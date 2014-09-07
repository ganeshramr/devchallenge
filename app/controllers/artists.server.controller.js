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
 * List of artists
 */
exports.list = function(req, res) {

    if (req.query.name) {
        logger.info('Getting details of the artist by name %s' , req.query.name);
        logger.debug('On Page: %d' ,req.query.currentPage);
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
                logger.debug('Search artists by name ',req.query.name, data);
                res.jsonp(data);
            }, function(err) {
                logger.error(err);
            });
    }

    if (req.query.id) {
        logger.info('Getting details of the artist by Id');
        spotifyApi.getArtist(req.query.id)
            .then(function(data) {
                logger.debug('Artist information', data);
                res.jsonp(data);
            }, function(err) {
                logger.error(err);
            });
    }

    if (!req.query.id && !req.query.name) {
        res.jsonp({});
    }
};