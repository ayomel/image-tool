// $(document).ready(function(){
//   $(".uploadBtn").click(function(file, fileName) {
//     var formData = new FormData();
//     formData.append(".imageLI img", file);
//
//     $.ajax({
//       url: "http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test",
//       type: "POST",
//       data: formData,
//       processData: false,
//       contentType: false,
//       success: function(res) {
//         console.log("Yay");
//       },
//       error: function() {
//         console.log("Nay");
//       }
//     })
//   })
// });

$(document).ready(function (e) {
    $('.uploadBtn').on('click',(function(e) {
        var formData = new FormData(this);
        formData.append('id', this.id);
        formData.append('img', $('.myInput')[0].files[0]);
        $.ajax({
            type:'POST',
            url: "http://ae03b8058ba7111e7835e020da757784-1577133485.us-east-2.elb.amazonaws.com/test",
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }));
});
