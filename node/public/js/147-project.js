var FS_ = null;
window.URL = window.URL || window.webkitURL;
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL || window.resolveLocalFileSystemURI;
window.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder;
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    function verifyEmail(){
			var status = false;     
			var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    		 if (document.register.email.value.search(emailRegEx) == -1) {
        	 	 alert("Please enter a valid email address.");
    	 	}
     		else {
             status = true;
     		}
            return status;
	}

    function verifyRegister(){
            if(verifyEmail())    {
                 window.location="/welcome";

            } 
    }

    function sendPassword(){
        if(verifyEmail()) {
            alert("We have sent you your password!");
        }
    }

  

    $(".changePic").click(function(e) {
            e.preventDefault();
           $("#img").attr('src', "http://lorempixel.com/800/800");
        })

    function errorCallback(e) {
        console.log('Error: ', e);
    }   

    function changeText() {
        $("#upload").attr("value", "Upload another");
    }

    function buildFigure(src) {
        var img = document.createElement('img');
        img.src = src;
        img.title = 'img.src = ' + img.src;
        img.alt = img.title;

        var figcaption = document.createElement('figcaption');
        figcaption.innerHTML = [
            '<a href="' + img.src + ' class="uploadedImage img-rounded  img-responsive" target="_new" ',
            'alt="This URL can be opened by the browser" ' ,
            'title="This URL can be opened by the browser"> lala </a>'
            ].join('');

        var figure = document.createElement('figure');
        figure.appendChild(img);

        return figure;
}


