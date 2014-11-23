/**
 * HTTP Database Server
 *
 * @package server
 * @author Anthony Guevara <anthony.guev@gmail.com>, Mitch Pierias <mitch@pierias.com>
 */

// Modules
var express = require('express')
,	bodyParser = require('body-parser')
,	http = require('http')
,	app = express()
,	jade = require('jade')
// Setup
var port = 3000;
// Express setup
app.set("view engine", "jade");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
// Routes
app.get('/', function(req, res) {
	res.render('index', {});
	//res.sendFile(__dirname + '/views/about.html');
});

var timestamp = +new Date;
timestamp = timestamp + 15000;

var user = {
	"loggedUser": {
		"visa": [
			{
				"expiry": timestamp
			}
		]
	}
}

app.get('/visa/:id?', function(req, res) {

	var timestamp = +new Date;

	var id = req.params.id;
	id = ('undefined' !== typeof id) ? Number(id) : false;

	if (id !== false) {
		res.json({
			data: {
				'date': user['loggedUser'].visa[id].expiry
			}
		});
	} else {
		var html = jade.compileFile(__dirname + '/views/modules/visa.jade');
		res.json({data:{
			content: html()
		}});
	}
});

app.post('/auth/login', function(req, res) {
	var username = req.body.username
	,	password = req.body.password;

	res.setCookie({});
});

app.get('/info', function(req, res) {
	var html = jade.compileFile(__dirname + '/views/modules/info.jade');
	res.json({data:{
		content: html()
	}});
})
// Start the HTTP service
var server = http.createServer(app).listen(port);
console.log("Node server running on port " + port);