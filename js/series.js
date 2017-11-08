for (var i = 0; i < myFiles.length; i++) {
	seriesID = myFiles[i].split(‘_’)[0]; //split the filename by _ and get the first item in the array

	getSlug(seriesID, function(slug) {
	  //use callbacks so the upload doesn't try to go before it has a slug

	  //make sure we have a slug before uploading.
		if (slug) {
	  		uploadFile(myFiles[i], function(data) {
	  			console.log(data)
	  		})
		}
	}
}
function getSlug(seriesID, callback) {

   // Use what you learned from the ajax call from the visualizer project

   // make an AJAX call to https://graphiti-dev-live.smithsonianearthtv.com/graphql
   // with this query: getSeries(seriesId: seriesID) { slug }
   //success:
   		callback(result.getSeries.slug);
   //fail:
   		//handle errors and return false to prevent upload with out slug
   		callback(false);
}

function uploadFile(file, slug, callback) {
	var fd = new FormData();
		fd.append('file', file);
	// Upload ajax goes here
	// USE: url: “http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test/“+slug
	//success:
		callback(data);
	//fail:
		// handle errors
		callback(false);
}
