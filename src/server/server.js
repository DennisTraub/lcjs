// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

exports.start = function() {
	var http = require("http");

	var server = http.createServer();

	server.on("request", function(request, response) {
	});

	server.listen(8080);
};