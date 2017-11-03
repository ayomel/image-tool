$(document).ready(function () {
    $('.uploadBtn').click(function() {
      var form = $('form')[0];
      var fd = new FormData(form);
        $.ajax({
            type:'POST',
            url: "http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test",
            data:fd,
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
    });
});
// function uploadFile (blobFile, fileName) {
//   var fd = new FormData;
//   fd.
// }
