var elBrowse  = document.getElementById("browse"),
		useBlob = false && window.URL,
		elPreview = document.getElementById("preview"),
		elDropZone = document.getElementById("dropZone");

$(document).ready(function(){
		$('#dropZone').bind('dragover', function(){
        $(this).addClass('drag-over');
    });
    $('#dropZone').bind('dragleave', function(){
        $(this).removeClass('drag-over');
    });
});

function readImage (file) {
  var reader = new FileReader();
	var elLI = document.createElement('LI');
	var elSpan = document.createElement('span');
  reader.addEventListener("load", function () {
    // we want to get that image's width and height px values!
    // Since the File Object does not hold the size of an image
    // we need to create a new image and assign it's src, so when
    // the image is loaded we can calculate it's width and height:
    var image  = new Image();
    image.addEventListener("load", function () {
      // Concatenate our HTML image info
      var imageInfo = file.name +' '+ // get the value of `name` from the `file` Obj
          image.naturalWidth  +' x '+ // But get the width from our `image`
          image.naturalHeight +' '+
          file.type +' '+ Math.round(file.size/1024) +'KB';

			//setting attributes for the append elements
			elLI.setAttribute("class", "imageLI");
			elSpan.setAttribute("class", "imageA");

			//innerHTML
			elSpan.innerHTML = "x";
			// append image and the HTML info string to our `#preview`
      elPreview.appendChild(elLI);	//elPreview.appendChild(this);
			elLI.appendChild(this);				//elPreview.insertAdjacentHTML("beforeend", imageInfo + '<br>');
			elLI.appendChild(elSpan);
			elLI.insertAdjacentHTML("beforeend", imageInfo + '<br>');

      if (useBlob) {
        // Free some memory for optimal performance
        window.URL.revokeObjectURL(image.src);
      }
    });
    image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  reader.readAsDataURL(file);
}

// 1.
// Once the user selects all the files to upload
// that will trigger a `change` event on the `#browse` input
elBrowse.addEventListener("change", function() {
  // Let's store the FileList Array into a variable:
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList
  var files  = this.files;
  // Let's create an empty `errors` String to collect eventual errors into:
  var errors = "";

  // if (!files) {
  //   errors += "File upload not supported by your browser.";
  // }
  // Check for `files` (FileList) support and if contains at least one file:
  if (files && files[0]) {

    // Iterate over every File object in the FileList array
    for(var i=0; i<files.length; i++) {

      // Let's refer to the current File as a `file` variable
      // https://developer.mozilla.org/en-US/docs/Web/API/File
      var file = files[i];
			//testing file extension for right file
      if ( (/\.(png|jpeg|jpg|)$/i).test(file.name) ) {
        readImage( file );
      } else {
        errors += file.name +" Unsupported Image extension\n";
      }
    }
  }

  // Notify the user for any errors (i.e: try uploading a .txt file)
  if (errors) {
    alert(errors);
  }

});

$(document).ready(function(){
    $("#close").click(function(){
        $("#panel").hide();
    });
});
