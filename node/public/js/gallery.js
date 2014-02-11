	Number.prototype.mod = function(n) {
			return ((this%n)+n)%n;
		}
		// img_list = list of {image url, image type} tuples. image type: 0 = my image, 1 = social image
		//	This list will be populated server side.
		var img_list = [
		["https://scontent-a-sjc.xx.fbcdn.net/hphotos-ash3/t1/1897827_10200537008706458_1515740617_n.jpg", 0],
		["http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/10/4/1380899355591/breaking-bad-010.jpg", 1],
		["http://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",0],
		["http://2.bp.blogspot.com/-qkiBFQco1Xw/T8srlweUvoI/AAAAAAAAEQM/WBveO1dVlD8/s1600/nature-wallpaper-27.jpg",1],
		["http://upload.wikimedia.org/wikipedia/commons/1/1a/Bachalpseeflowers.jpg",0]
		];
		
		var current_img_urls = [];
		var currently_selected_img = 0;

		function selectNewFilter(filter, text) {
			$("#filter-text").text(text);
			updateGallery(filter);
			return false;
		};

		function nextImage() {
			/*$('.imgoverlay-frame').animate({left: "-100%"},150, function() {
				updateAndShowOverlay((currently_selected_img+1).mod(current_img_urls.length), false);
				$('.imgoverlay-frame').css("left", "100%");
				$('.imgoverlay-frame').animate({left: "0%"},150);
			});*/
updateAndShowOverlay((currently_selected_img+1).mod(current_img_urls.length), false);
};

function previousImage() {
	updateAndShowOverlay((currently_selected_img-1).mod(current_img_urls.length), false);
}

function updateAndShowOverlay(index,show) {
	$('#overlay-image').attr("src",current_img_urls[index]);
	currently_selected_img = index;
	if (show) showOverlay();
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

function createGallery() {
	div_html = "";
	current_img_urls = [];
	cur_idx = 0;
	for (i = 0; i < img_list.length; i++) {
		div_html += "<img class='img-gallery' src=\"" + img_list[i][0] + "\" id='gal_img_"+i+"' onclick=\"javascript:updateAndShowOverlay("
			+cur_idx+",true)\"/>";					
current_img_urls.push(img_list[i][0]);
cur_idx++;				
}
$("#gallery-content").html(div_html);			
}

		// Updates gallery div with currently selected photos. filter_type: 0 = my images only, 1 = social images only, 2 = all images (default)
		function updateGallery(filter_type) {
			filter_type = typeof filter_type !== 'undefined' ? filter_type : 2;			
			current_img_urls = [];			
			cur_idx = 0;
			for (i = 0; i < img_list.length; i++) {
				if (img_list[i][1] == filter_type || filter_type == 2) {					
					$("#gal_img_"+i).click((function(idx) {
						return function() {
							updateAndShowOverlay(idx,true);
						};
					})(cur_idx));
					$("#gal_img_"+i).show();
					current_img_urls.push(img_list[i][0]);
					cur_idx++;				
				}
				else {
					$("#gal_img_"+i).hide();
				}
			}
		};

		createGallery();