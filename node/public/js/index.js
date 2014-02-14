var img_list = []

function setRandomPhoto(photos) {
	img_list = photos;
	var photo = photos[Math.floor(Math.random()*photos.length)];
	var html = "";
	if (photo['url'].indexOf('text://') == 0) {
		var text = photo['url'].substring(7);
		html = '<h3 style="text-align:center">'+text+'</h3>';

	} else {
		html = '<img id="randomImg" class="img-rounded  img-responsive" src="'+photo['url']+'"/>';			
	}
	$("#Randomimage").html(html);		
}

$(".submittButton .changePic").click(function(e) {
   e.preventDefault();
   setRandomPhoto(img_list);
})