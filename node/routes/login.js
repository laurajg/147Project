exports.view = function(req, res){
	if(req.session.user) {
		res.redirect('/');
	} else {
		var valid = true;
		if (req.query.invalid) {
			valid = false;
		}
		res.render('login', {'valid': valid});
	}
};