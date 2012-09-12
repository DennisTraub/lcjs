// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.setUp = function(done) {
	server.start(8080);
	done();
};

exports.tearDown = function(done) {
	server.stop(function() {
		done();
	});
};

exports.test_serverReturnsHelloWorld = function(test) {
	var request = http.get("http://localhost:8080");
	request.on("response", function(response) {
		test.equals(200, response.statusCode, "status code");
		response.setEncoding("utf-8");

		response.on("data", function(chunk) {
			test.equals("Hello World", chunk, "response text");
		});

		response.on("end", function() {
			test.done();
		});

	});
};

exports.test_serverRunsCallbackWhenStopCompletes = function(test) {
	server.stop(function() {
		test.done();
	});
	// server.start(); // TODO: this is ugly
};