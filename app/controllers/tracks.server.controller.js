'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
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
 * List of tracks
 */
exports.listTracks = function(req, res) {

    var albumId = req.param('albumId');
    logger.info('Getting details of the tracks for album id: ' + albumId);
    if (albumId) {

        logger.debug('On Page: ' + req.query.currentPage);
        var offsetCalculated = 0;
        if (Number(req.query.currentPage) !== 1) {
            offsetCalculated = ((req.query.currentPage - 1) * 10) + 1;
        }

        // Get tracks by a certain artist
        spotifyApi.getAlbumTracks(albumId, {
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