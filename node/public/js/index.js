var img_list = []

function setRandomPhoto(photos) {
	img_list = photos;
	var photo = photos[Math.floor(Math.random()*photos.length)];
	$("#randomImg").attr('src', photo['url']);
}

$(".submittButton .changePic").click(function(e) {
   e.preventDefault();
   setRandomPhoto(img_list);
})