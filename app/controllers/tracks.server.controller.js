'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

 /**
 * List of tracks
 */
exports.listTracks = function(req, res) { 
    
    var albumId = req.param('albumId');
	console.log('Getting details of the tracks for album id: '+albumId);
	if(albumId){
		
		console.log('On Page: '+req.query.currentPage);
		var offsetCalculated = 0;
		if(Number(req.query.currentPage) !== 1){
			offsetCalculated = ((req.query.currentPage - 1) * 10) + 1 ;
		}

		// Get tracks by a certain artist
		spotifyApi.getAlbumTracks(albumId,{limit: 10, offset: offsetCalculated})
		  .then(function(data) {
		    console.log('Artist albums', data);
		    res.jsonp(data);
		  }, function(err) {
		    console.error(err);
		  });
		
	}

 };
