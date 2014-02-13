exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			dbUtils.getReminders(req.session.user, function(reminders) {
				res.render('prefs', {'user': req.session.user, 'goal': goal, 'reminders': reminders});
			});
		});
	}
};