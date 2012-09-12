// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(done) {
	server.stop(function() {
		done();
	});
};

exports.test_serverReturnsHelloWorld = function(test) {
	server.start();
	http.get("http://localhost:8080", function(response) {
		test.equals(200, response.statusCode, "status code");
		response.setEncoding("utf-8");

		response
			.on("data", function(chunk) {
				test.equals("Hello World", chunk, "response text");
			})
			.on("end", function() {
				test.done();
			});

	});
};