exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		res.render('update_friends', {'user': req.session.user});
	}
};