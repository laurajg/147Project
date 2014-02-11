exports.view = function(req, res){

	if(!req.session.user) {
		res.redirect('landing');
	} else {
		res.render('share', {'user': req.session.user, 'welcome': true});
	}
};