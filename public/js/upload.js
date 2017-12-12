$(document).ready(function () {
  var token = $('#the-token').attr('data-token');
    $('.uploadBtn').click(function() {
      for (var i = 0; i < theFile.length; i++) {
        var btn = document.getElementsByClassName('imageA');
        if (theFile[i].delete) {
          console.log(theFile[i].name + ' deleted ignoring');
          continue;
        }
        getSlug(theFile[i], function(file) {
          var theId = document.getElementById(file.liID);
          if (file.slug) {
            uploadFile(file, function(data) {
              $(theId).find("button").removeClass("remove");
              $(theId).find("button").addClass("checkmark");
              $(theId).find("button").addClass("noPointEvent");
              console.log(data);
              return;
            })
          }
          else {
            $(theId).find("button").removeClass("remove");
            $(theId).find("button").addClass("x-in-circle");
          }
        });
      }
    });
  function getSlug(file, callback) {
    var seriesID = file.name.split('_')[0];
    var seasonNumber = file.name.split('_')[1];
    function getQuery() {
      // if seriesID is 0 as well as season Number it's a show not series
      if (seriesID == 0 && seasonNumber == 0) {
        var showID = file.name.split('_')[2];
        return '{response:getShow(showId: "' + showID + '"){ slug }}';
      }
      else {
        return '{response:getSeries(seriesId: "' + seriesID + '"){ slug }}';
      }
    }
    $.ajax({
      type:'POST',
      url: "https://graphiti-dev-preview.smithsonianearthtv.com/graphql", //url: "https://graphiti-dev-live.smithsonianearthtv.com/graphql",
      data: getQuery(),
      cache: false,
      contentType: false,
      processData: false,
      success:
        function(data){
          file.slug = data.data.response.slug;
          callback(file);
        },
      error:
        function(error){
          console.log(error);
        }
    });
  }
  function uploadFile(file, callback) {
    var fd = new FormData();
        fd.append('file', file);
        var seasonNumber = file.name.split('_')[1];
        var episodeID = file.name.split('_')[2];
        var imageType = file.name.split('_')[3];
        function pathImage() {
          //season level images
          if (episodeID == 0 && seasonNumber == 0) {
            //series-level image
            return "https://kanvas-dev.smithsonianearthtv.com/test/" + file.slug + "/" + imageType;
          }
          else if (episodeID == 0) {
            //season-level image
            return "https://kanvas-dev.smithsonianearthtv.com/test/" + file.slug + "/seasons/" + seasonNumber + "/" + imageType;
          }
          else {
            //episode-level image
            return "https://kanvas-dev.smithsonianearthtv.com/test/" + file.slug + "/seasons/" + seasonNumber + "/episodes/" + episodeID + "/" + imageType;
          }
        }
        $.ajax({
            type:'POST',
            url: pathImage(),
            beforeSend:
              function(xhr) {
                xhr.setRequestHeader('Authorization','Bearer ' + token );
              },
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
