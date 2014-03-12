exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
            dbUtils.getContacts(req.session.user, function(contacts) {
                contacts = typeof contacts !== 'undefined' ? contacts : [];          
                console.log(JSON.stringify(contacts));
                contacts_str = "[";
                for (i=0; i < contacts.length; i++) {
                    contacts_str += "\""+contacts[i]+"\"";
                    if (i != contacts.length - 1) {
                        contacts_str += ", ";
                    }                    
                }
                contacts_str += "]";
                //res.render('share', {'user': req.session.user, 'goal': goal, 'numNew': req.session.numNew, 'contacts': contacts_str});    
                res.render('share', {'user': req.session.user, 'goal': goal, 'numNew': (req.session.numNew? req.session.numNew: 0), 'contacts': contacts});    
            })			
		});
	}
};