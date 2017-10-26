var Browse  = document.getElementById("browse"),
		useBlob = false && window.URL,
		Preview = document.getElementById("preview"),
		dropZone = document.getElementById("dropZone"),
		flexZone = document.getElementsByClassName("flexZone"),
		imageBtn = document.getElementsByClassName("imageA")
		imageLI = document.getElementsByClassName("imageLI"),
		deleteAll = document.getElementsByClassName("deleteAll");

function readImage(file) {
  var reader = new FileReader();
	var myLi = document.createElement('LI');
	var myBtn = document.createElement('BUTTON');
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
			myLi.setAttribute("class", "imageLI");
			myBtn.setAttribute("class", "btn-danger imageA btn");
			myBtn.setAttribute("type", "button");

			//innerHTML
			myBtn.innerHTML = "x";
			// append image and the HTML info string to our `#preview`
      Preview.appendChild(myLi);	//Preview.appendChild(this);
			myLi.appendChild(this);				//Preview.insertAdjacentHTML("beforeend", imageInfo + '<br>');
			myLi.appendChild(myBtn);
			myLi.insertAdjacentHTML("beforeend", imageInfo + '<br>');

			//remove individual items
			myBtn.onclick = function() {
				this.parentNode.remove(this);
				console.log("damn I'm good");
			};
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

Browse.addEventListener("change", function() {
  // Let's store the FileList Array into a variable:
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList
  var files  = this.files;
  // Let's create an empty `errors` String to collect eventual errors into:
  var errors = "";
  // Check for `files` (FileList) support and if contains at least one file:
  if (files && files[0]) {

    // Iterate over every File object in the FileList array
    for(var i=0; i<files.length; i++) {

      // Let's refer to the current File as a `file` variable
      // https://developer.mozilla.org/en-US/docs/Web/API/File
      var file = files[i];
			//testing file extension for right file
      if ( (/\.(jpeg|jpg|)$/i).test(file.name) ) {
        readImage(file);
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
//essential the same listener as change
dropZone.addEventListener("drop", function(e) {
	e.preventDefault();
	var files = e.dataTransfer.files;
	var errors = "";
	if(files && files[0]) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			if ( (/\.(jpeg|jpg|)$/i).test(file.name) ) {
        readImage(file);
      } else {
        errors += file.name +" Unsupported Image extension\n";
      }
		}
	}
});
$(document).ready(function(){
		//when dragover css updates
		$('.deleteAll').click(function() {
			while (Preview.hasChildNodes()) {
				Preview.removeChild(Preview.lastChild);
			}
		});

		$('#dropZone').bind('dragover', function(){
      $(this).addClass('drag-over');
    });
		//when dragleave css updates
    $('#dropZone').bind('dragleave', function(){
    	$(this).removeClass('drag-over');
    });
});
