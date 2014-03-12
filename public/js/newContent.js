$(document).ready(function() {
    $("#addMessage").hide();
    $("#addPhoto").hide();
    var test = $("#addMessage");
    console.log(test.length);

    $(".addPhotoButton").click(function(e) {
        e.preventDefault();
        $("#addMessage").hide();
        $("#addPhoto").show();
        $("#files").click();
    });
     $(".addMessageButton").click(function(e) {
        e.preventDefault();
        $("#addPhoto").hide();
        $("#addMessage").show();
        $("#message").focus();
    });
})



 function handleFileSelect(evt, numNew) {
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
          $.post('/addPhoto', {'share': $("#share option:selected").attr('id'), 'data': e.target.result}, function(data) {
              var div = document.createElement('div');
              document.getElementById('list').insertBefore(div, null);
              div.innerHTML = [' <div class="imageBlock"><a href="" action=deleteImage()> <img class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/> </a> Uploaded!</div>'].join('');
              incrementNew(numNew);

          });
          


        }
   
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function sendMessage() {
    var message = $("#message").val();
    $.post('/sendUpdate', {'share': $("#share option:selected").attr('id'), 'message': message});

    $("#message").val("");
    $("#msg_sent").text("Message \"" + message + "\" added!");
    $("#msg_sent").css("display", "block");

    incrementNew();
  }

  function incrementNew() {
    var numNew = $("#numNew")[0].innerHTML;
    $("#numNew")[0].innerHTML = parseInt(numNew) + 1;
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
