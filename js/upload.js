$(document).ready(function () {
    $('.uploadBtn').click(function() {
      var myFiles = document.getElementById("browse").files;
      for (var i = 0; i < myFiles.length; i++) {
        var seriesID = myFiles[i].name.split('_')[0];

        getSlug(seriesID);
        uploadFile(myFiles[i]);
      }
    });


  function getSlug(ID, callback) {
    $.ajax({
      type:'POST',
      url: "https://graphiti-dev-live.smithsonianearthtv.com/graphql",
      data: '{getSeries(seriesId: "' + ID + '") { slug }}',
      cache:false,
      contentType: false,
      processData: false,
      success:function(data){
        console.log(data.data.getSeries.slug);
      },
      error: function(){
        console.log("error");
      }
    });
  }
  function uploadFile(file, slug, callback) {
    var fd = new FormData();
        fd.append('file', file);
        $.ajax({
            type:'POST',
            url: "http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test/" + slug,
            data: fd,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log(data);
            },
            error: function(){
                console.log("error");
            }
        });
  }
});
