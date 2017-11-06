const browse  = document.getElementById("browse");
const selectImage = document.getElementById("selectImage");
const blob = false && window.URL;
const preview = document.getElementById("preview");
const dropZone = document.getElementById("dropZone");
const flexZone = document.getElementsByClassName("flexZone");
const imageBtn = document.getElementsByClassName("imageA");
const imageLI = document.getElementsByClassName("imageLI");
const deleteAll = document.getElementsByClassName("deleteAll");
var fileResults = [];
var theFile = [];

function scanFile(file) {
  var fileReader = new FileReader();
	var myLi = document.createElement('LI');
	var myBtn = document.createElement('BUTTON');
  fileReader.addEventListener("load", function () {
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
      if (blob) {
        // Free some memory for optimal performance
        blob.revokeObjectURL(image.src);
      }
    });
    image.src = blob ? image.createObjectURL(file) : fileReader.result;
    // fileResults.push(fileReader);
    // console.log(fileResults);
    theFile.push(file);
  });
  fileReader.readAsDataURL(file);
}
browse.addEventListener("change", function() {
  var files  = this.files;
  var errors = "";
  if (files && files[0]) {
    for(var i=0; i<files.length; i++) {
      var file = files[i];
      if ( (/\.(jpeg|jpg|svg|)$/i).test(file.name) ) {
        scanFile(file);
      } else {
        errors += file.name +" Unsupported Image extension\n";
      }
    }
  }
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
				$('#preview').empty();
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
