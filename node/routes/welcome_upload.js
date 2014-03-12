exports.view = function(req, res){

	if(!req.session.user) {
		res.redirect('landing');
	} else {

		if (req.query.goal) {
			var dbUtils = require('dbUtils');
			dbUtils.setGoal(req.session.user, req.query.goal);
		}

		if (req.query.changed) {
			req.session.numNew = null;
			req.session.save();
		}

		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			res.render('add_content', {'user': req.session.user, 'goal': goal, 'welcome': true, 'numNew': (req.session.numNew? req.session.numNew: 0)});
		});
	}
};