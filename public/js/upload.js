$(document).ready(function () {
  var token = document.getElementById('token').innerHTML;
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
              $(theId).find("button").removeClass("btn-danger");
              $(theId).find("button").addClass("btn-success");
              $(theId).find("button").addClass("noPointEvent");
              $(theId).find("button").html('<i class="fa fa-check" aria-hidden="true"></i>');
              console.log(data);
              return;
            })
          }
          else {
            $(theId).find("button").removeClass("btn-danger");
            $(theId).find("button").addClass("btn-fail");
          }
        });
      }
    });
  function getSlug(file, callback) {
    var seriesID = file.name.split('_')[0];
    var seasonNumber = file.name.split('_')[1];
    function getQuery() {
      if (seriesID == 0 && seasonNumber == 0) {
        var showID = file.name.split('_')[2];
        console.log(showID);
        return '{response:getShow(showId: "' + showID + '"){ slug }}';
      }
      else {
        console.log(seriesID);
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
        function(data){
          callback(false);
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
          if (seasonNumber == 0 || episodeID == 0) {
            return "https://kanvas-dev.smithsonianearthtv.com/test/" + file.slug + "/" + imageType;
          }
          else if (seasonNumber == 0 && episodeID == 0) {
            var showID = file.name.split('_')[3];
            return "https://kanvas-dev.smithsonianearthtv.com/test/jago/" + showID;
          }
          else {
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
