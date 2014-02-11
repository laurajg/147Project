exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		res.render('gallery', {'user': req.session.user});
	}
};