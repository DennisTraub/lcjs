// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(done) {
	server.stop(function() {
		done();
	});
};

exports.testHttpServer = function(test) {
	server.start();
	http.get("http://localhost:8080", function(response) {
		test.done();
	});
};