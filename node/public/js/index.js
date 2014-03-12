var img_list = []

function setRandomPhoto(photos, showPhoto) {
	img_list = photos;
	if (!showPhoto) {
		var photo = photos[Math.floor(Math.random()*photos.length)];
	} else {
		var photo = {'url': showPhoto};
	}
	var html = "";

	if (photo['url'].indexOf('text://') == 0) {
		var text = photo['url'].substring(7);
		html = '<div class="text-randomInspiration" style="text-align:center"><span>'+text+'</span></div>';
	} else {
		html = '<img id="randomImg" class="img-rounded  img-responsive" src="'+photo['url']+'"/>';			
	}
	$("#Randomimage").html(html);	

	var background_photos = [
							 "http://img0.etsystatic.com/003/0/5777729/il_fullxfull.407855002_td88.jpg?ref=l2",
							 "http://www.wallcoo.net/cartoon/abstract_colors_2560x1600_0902/images/abstract_colors_bloodstream_pink.jpg",
							 "http://img1.etsystatic.com/000/0/5129771/il_fullxfull.145546027.jpg?ref=l2",
							 "http://www.backgroundsy.com/file/preview/wood-grain-background.jpg",
							 "http://backgrounds.picaboo.com/download/1a/ae/1aee0f80748446cabee56c8c6a92b3c2/blue%20water%20copy.jpg",
							 "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQVKx6oic8AcknmPjkBUKdh95XdykY5dyJIlU8wWvrrbmyCQGFA",
							 "http://tdwhs.nwasco.k12.or.us/staff/lewing/resources/design/iMovie_ppt/Apple_Ensemble/SpaceMist.jpg",
							 "http://4.bp.blogspot.com/_OJsWo9ijhWY/S6whctnHYFI/AAAAAAAAABQ/f_U4hUi0dPE/s1600/diving_ocean+free+wallpaper.jpg",
							 "http://www.zingerbug.com/Backgrounds/background_images/blue_sky_with_clouds.jpg"
							 
							 ];
	var background_photo = background_photos[Math.floor(Math.random()*background_photos.length)];


	$('.text-randomInspiration').css("background-image", "url(" + background_photo + ")");  	
}

$(".submittButton .changePic").click(function(e) {
   e.preventDefault();
   setRandomPhoto(img_list);
})