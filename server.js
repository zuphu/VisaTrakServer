/**
 * HTTP Server
 * Parses request, interfaces with system and handles response.
 *
 * @package server
 * @author Mitch Pierias <mitch@pierias.com>
 */

/*
 * VARIABLES
 */

/* Environment */
var local = false;

// Modules
var express = require('express')
,	bodyParser = require('body-parser')
,	http = require('http')
,	app = express()
// Setup
var port = 3000;

app.get('/', function(req, res) {
	res.send('<h1>Hello World</h1>');
});

/*
 * SERVER
 */

// Create a HTTP service
var server = http.createServer(app).listen(port);
console.log("Node server running on port " + port);