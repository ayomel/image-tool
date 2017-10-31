const browse  = document.getElementById("browse");
const selectImage = document.getElementById("selectImage");
const imageURL = false && window.URL;
const preview = document.getElementById("preview");
const dropZone = document.getElementById("dropZone");
const flexZone = document.getElementsByClassName("flexZone");
const imageBtn = document.getElementsByClassName("imageA");
const imageLI = document.getElementsByClassName("imageLI");
const deleteAll = document.getElementsByClassName("deleteAll");

function scanFile(file) {
  var fileReader = new FileReader();
	var myLi = document.createElement('LI');
	var myBtn = document.createElement('BUTTON');
  fileReader.addEventListener("load", function () {
    // we want to get that image's width and height px values!
    // Since the File Object does not hold the size of an image
    // we need to create a new image and assign it's src, so when
    // the image is loaded we can calculate it's width and height:
    var image  = new Image();
    image.addEventListener("load", function () {
      // Concatenate our HTML image info
      var imageInfo = file.name +' '+ image.naturalWidth  +' x '+image.naturalHeight;
			//setting attributes for the append elements
			myLi.setAttribute("class", "imageLI");
			myBtn.setAttribute("class", "btn-danger imageA btn");
			myBtn.setAttribute("type", "button");

			//innerHTML
			myBtn.innerHTML = "x";
			// append image and the HTML info string to our `#preview`
      preview.appendChild(myLi);	//preview.appendChild(this);
			myLi.appendChild(this);				//preview.insertAdjacentHTML("beforeend", imageInfo + '<br>');
			myLi.appendChild(myBtn);
			myLi.insertAdjacentHTML("beforeend", imageInfo + '<br>');

			//remove individual items
			myBtn.onclick = function() {
				this.parentNode.remove(this);
			};
      if (imageURL) {
        // Free some memory for optimal performance
        imageURL.revokeObjectURL(image.src);
      }
    });
    image.src = imageURL ? image.createObjectURL(file) : fileReader.result;
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  fileReader.readAsDataURL(file);
}

browse.addEventListener("change", function() {
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
        scanFile(file);
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
selectImage.addEventListener("change", function() {
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
        scanFile(file);
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
        scanFile(file);
      } else {
        errors += file.name +" Unsupported Image extension\n";
      }
		}
	}
	if (errors) {
		alert(errors)
	}
});
$(document).ready(function(){
		//when dragover css updates
		$('.deleteAll').click(function() {
			while (preview.hasChildNodes()) {
				preview.removeChild(preview.lastChild);
			}
		});
		$('#dropZone').bind('dragover', function(){
      $(this).addClass('drag-over');
    });
		//when dragleave css updates
    $('#dropZone').bind('dragleave', function(){
    	$(this).removeClass('drag-over');
    });
		$('#dropZone').on('drop', function(e) {
			$(this).removeClass('drag-over');
		});
});
