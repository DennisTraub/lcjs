// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.test_serverReturnsHelloWorld = function(test) {
	server.start(8080);
	var request = http.get("http://localhost:8080");
	request.on("response", function(response) {
		test.equals(200, response.statusCode, "status code");
		response.setEncoding("utf-8");

		response.on("data", function(chunk) {
			test.equals("Hello World", chunk, "response text");
		});

		response.on("end", function() {
			server.stop(function() {
                test.done();
            });
		});
	});
};

exports.test_server_requires_port_number = function(test) {
    test.throws(function() {
        server.start();
    });
    test.done();
};

exports.test_serverRunsCallbackWhenStopCompletes = function(test) {
	server.start(8080);
	server.stop(function() {
		test.done();
	});
};

exports.test_stopCalledWhenServerIsntRunningThrowsException = function(test) {
	test.throws(function() {
		server.stop();
	});
    test.done();
};