$(document).ready(function () {
    $('.uploadBtn').click(function() {
      for (var i = 0; i < theFile.length; i++) {
        getSlug(theFile[i], function(file) {
              console.groupCollapsed('getSlug callback');
              console.log(file);
              console.groupEnd();
          if (file.slug) {
            uploadFile(file, function(data) {
              console.groupCollapsed('uploadFile callback: '+data.file.slug, data.file.name);
              console.log(data);
              console.groupEnd();
              return;
            })
          }
        });
      }
    });
  function getSlug(file, callback) {
    var seriesID = file.name.split('_')[0];
    $.ajax({
      type:'POST',
      url: "https://graphiti-dev-live.smithsonianearthtv.com/graphql",
      data: '{getSeries(seriesId: "' + seriesID + '") { slug }}',
      cache: false,
      contentType: false,
      processData: false,
      success:
        function(data){
          //check to see if we got a slug and error if not
          file.slug = data.data.getSeries.slug;
          callback(file);
        },
      error:
        function(data){
          callback(false);
        }
    });
  }
  function uploadFile(file, callback) {
    //slug is file.slug
    var fd = new FormData();
        fd.append('file', file);
        $.ajax({
            type:'POST',
            url: "http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test/" + file.slug,
            data: fd,
            cache:false,
            contentType: false,
            processData: false,
            success:
              function(data){
                data.file = file;
                callback(data);
              },
            error:
              function(){
                callback(false);
              }
        });
  }
});
