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
});

// Start the HTTP service
var server = http.createServer(app).listen(port);
console.log("Node server running on port " + port);