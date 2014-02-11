
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var upload = require('./routes/upload');
var preferences = require('./routes/preferences');
var share = require('./routes/share');
var welcome = require('./routes/welcome');
var welcome_upload = require('./routes/welcome_upload');
var welcome_share = require('./routes/welcome_share');
var login = require('./routes/login');
var landing = require('./routes/landing');
var register = require('./routes/register');
var terms = require('./routes/terms');
var password = require('./routes/password');
var gallery = require('./routes/gallery');
var update_friends = require('./routes/update_friends');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/upload', upload.view);
app.get('/preferences', preferences.view);
app.get('/share', share.view);
app.get('/welcome', welcome.view);
app.get('/welcome_upload', welcome_upload.view);
app.get('/welcome_share', welcome_share.view);
app.get('/login', login.view);
app.get('/landing', landing.view);
app.get('/register', register.view);
app.get('/terms', terms.view);
app.get('/password', password.view);
app.get('/gallery', gallery.view);
app.get('/update_friends', update_friends.view);
// app.get('/gallery', gallery.addFriend);

var dbUtils = require('dbUtils');
dbUtils.initialize(function(err) {
	if(err) throw err;
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});
