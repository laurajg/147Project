exports.view = function(req, res){
	if(req.session.user) {
		delete req.session.user
	}
	res.render('landing');
};