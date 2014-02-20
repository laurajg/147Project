$(document).ready(function() {
    $("#addMessage").hide();
    $("#addPhoto").hide();
    var test = $("#addMessage");
    console.log(test.length);

    $(".addPhotoButton").click(function(e) {
        e.preventDefault();
        $("#addMessage").hide();
        $("#addPhoto").show();
    });
     $(".addMessageButton").click(function(e) {
        e.preventDefault();
        $("#addPhoto").hide();
        $("#addMessage").show();
    });
})



 function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();
      var img_list = []

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.

          var div = document.createElement('div');
          div.innerHTML = [' <div class="imageBlock"><a href="" action=deleteImage()> <img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/> </a> Uploaded!</div>'].join('');

          document.getElementById('list').insertBefore(div, null);
          

          //HERE IS WHAT ISN'T FINISHED. I DONT KNOW HOW TO PASS THIS THROUGH
          // dbUtils.addPhoto(req.session.user,  e.target.result);

          $.post('/addPhoto', {'data': e.target.result});


        }
                   
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
