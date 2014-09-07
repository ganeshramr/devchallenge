'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

 /**
 * List of artists
 */
exports.listAlbums = function(req, res) { 
    
    var artistId = req.param('artistId');
	console.log('Getting details of the album for artist id: '+artistId);
	if(artistId){
		
		console.log('On Page: '+req.query.currentPage);
	// Search artists whose name contains 'Love
		var offsetCalculated = 0;
		var currentPage = 1;
		if(req.query.currentPage){
			currentPage = req.query.currentPage;
		}
		if(Number() !== 1){
			offsetCalculated = ((currentPage - 1) * 10) + 1 ;
		}

		// Get albums by a certain artist
		spotifyApi.getArtistAlbums(artistId,{limit: 10, offset: offsetCalculated})
		  .then(function(data) {
		    console.log('Artist albums', data);
		    res.jsonp(data);
		  }, function(err) {
		    console.error(err);
		  });
		
	}

 };
