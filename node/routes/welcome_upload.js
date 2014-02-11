exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		res.render('upload_photos', {'user': req.session.user, 'welcome': true});
	}
};