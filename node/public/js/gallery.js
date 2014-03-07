Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}
// img_list = list of {image url, image type} tuples. image type: 0 = my image, 1 = social image
//	This list will be populated server side.
// var img_list = [
// ["https://scontent-a-sjc.xx.fbcdn.net/hphotos-ash3/t1/1897827_10200537008706458_1515740617_n.jpg", 0],
// ["http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/10/4/1380899355591/breaking-bad-010.jpg", 1],
// ["http://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",0],
// ["http://2.bp.blogspot.com/-qkiBFQco1Xw/T8srlweUvoI/AAAAAAAAEQM/WBveO1dVlD8/s1600/nature-wallpaper-27.jpg",1],
// ["http://upload.wikimedia.org/wikipedia/commons/1/1a/Bachalpseeflowers.jpg",0]
// ];
var img_list = [];
var current_img_urls = [];
var currently_selected_img = 0;

function selectNewFilter(filter, text) {
	$("#filter-text").text(text);
	updateGallery(filter);
	event.preventDefault();
}

function nextImage() {
	/*$('.imgoverlay-frame').animate({left: "-100%"},150, function() {
		updateAndShowOverlay((currently_selected_img+1).mod(current_img_urls.length), false);
		$('.imgoverlay-frame').css("left", "100%");r
		$('.imgoverlay-frame').animate({left: "0%"},150);
	});*/
	updateAndShowOverlay((currently_selected_img+1).mod(current_img_urls.length), false);
}

function previousImage() {
	updateAndShowOverlay((currently_selected_img-1).mod(current_img_urls.length), false);
}

function updateAndShowOverlay(index,show) {
	var html = '<span class="imgoverlay-helper"></span>';
	// this is such a hack...
	var from = null;
	for (i = 0; i < img_list.length; i++) {
		if (img_list[i].url === current_img_urls[index] ) {
			if (img_list[i].from !== 'undefined') {
				from = img_list[i].from;
			}
			break;
		}
	}
	if (current_img_urls[index].indexOf('text://') == 0) {
		var textmsg = current_img_urls[index].substring(7);
		var background_photo = $("#gal_img_" + index).css('background-image').replace('url(','').replace(')','');;
		html += "<div class='img-gallery-zoom'><div class='text-gallery-zoom' style=\"background-image:url(" + background_photo + ")\" onclick=\"javascript:event.stopPropagation()\"><span id='txtdisp'>"+textmsg+"</span></div>";
		html += "<a class=\"closeIconText\">x</a>";
		if (from != null) {
			html += "<div class='fromText'>From: "+from+"</div>";	
		}		
		html += "</div>";
	} else {
		html += "<div class='img-gallery-zoom'><img id='overlay-image' src=\"" + current_img_urls[index] + "\" onclick=\"javascript:event.stopPropagation()\"/><a class='closeIconImg'>x</a>"
		if (from != null) {
			html += "<div class='fromText'>From: "+from+"</div>";	
		}	
		html += "</div>";					
	}
	$('.imgoverlay-frame').html(html);
	currently_selected_img = index;
	if (show) showOverlay();

	$(".closeIconImg").click(function() {
		var del = confirm("Are you sure you want to delete this?");
		var image = $(this).siblings()[0];
		if (del) {
			$.post('/deletePhoto', {'photoURL': image.src}, function() {
				$(this).parent().remove();

				current_img_urls = current_img_urls.filter(function(obj) {
					return obj != image.src;
				});
				currently_selected_img=0;
				location.reload();
			});
			
		}

	});
	$(".closeIconText").click(function(e) {
		var del = confirm("Are you sure you want to delete this?");
		var spantext = $('#txtdisp').html();
		if (del) {
			$.post('/deletePhoto', {'photoURL': 'text://' + spantext}, function() {
				$(this).parent().remove();
				current_img_urls = current_img_urls.filter(function(obj) {
					return obj != 'text://' + spantext;
				});
				currently_selected_img=0;
				location.reload();
			});
		}
	});

}

function showOverlay() {
	$('#overlay').show();
	$('.myarrow').show();
	$('.imgoverlay-frame').show();
}

function hideOverlay() {
	$('#overlay').hide();
	$('.myarrow').hide();
	$('.imgoverlay-frame').hide();
}

function createGallery(photos) {
	img_list = photos;
	div_html = "";
	current_img_urls = [];
	cur_idx = 0;

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



	for (i = 0; i < img_list.length; i++) {
		if (img_list[i]['url'].indexOf('text://') == 0) {
			var textmsg = img_list[i]['url'].substring(7);
			var background_photo = background_photos[Math.floor(Math.random()*background_photos.length)];

			div_html += "<div class='text-gallery  oneGalleryImg";
			if (img_list[i]['new']) {
				div_html += " new-photo";
			}
			div_html += "' id='gal_img_"+i+"' style=\"background-image:url(" + background_photo + ")\" onclick=\"javascript:updateAndShowOverlay("
				+cur_idx+",true)\"><span>"+textmsg+"</span></div>"
		} else {
			div_html += "<div style='float:left;' class=\"oneGalleryImg"
			if (img_list[i]['new']) {
				div_html += " new-photo "
			}
			div_html += "\"><div  id='gal_img_"+i+"'><img class='img-gallery' src=\"" + img_list[i]['url'] + "\" onclick=\"javascript:updateAndShowOverlay("
				+cur_idx+",true)\"/></div></div>";					
		}
	current_img_urls.push(img_list[i]['url']);
	cur_idx++;				
	}

	if (!img_list.length) {
		div_html += "<div>No photos added yet! <a href=\"/add_content\">Add some here!</a></div>"
	}


	$("#gallery-content").html(div_html);	
	$.post('/setPhotosSeen', {'image_urls': current_img_urls});

}

// Updates gallery div with currently selected photos. filter_type: 0 = my images only, 1 = social images only, 2 = all images (default)
function updateGallery(filter_type) {
	filter_type = typeof filter_type !== 'undefined' ? filter_type : 2;			
	current_img_urls = [];			
	cur_idx = 0;
	for (i = 0; i < img_list.length; i++) {
		if (img_list[i]['type'] == filter_type || filter_type == 2) {					
			$("#gal_img_"+i).click((function(idx) {
				return function() {
					updateAndShowOverlay(idx,true);
				};
			})(cur_idx));
			$("#gal_img_"+i).show();
			current_img_urls.push(img_list[i]['url']);
			cur_idx++;				
		}
		else {
			$("#gal_img_"+i).hide();

		}
	}
};