exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		res.render('prefs', {'user': req.session.user});
	}
};