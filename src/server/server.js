// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");
var server;

exports.start = function(port) {
	server = http.createServer();
	server.on("request", function(request, response) {
		response.write("Hello World");
		response.end();
	});

	server.listen(port);
};

exports.stop = function(callback) {
	server.close(callback);
};