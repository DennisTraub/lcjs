// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");
var fs = require("fs");

exports.test_server_serves_a_file = function(test) {
    var html = "<html><body><p>Test file</p></body></html>";

    var testFile = "generated/test/test.html";

    fs.writeFileSync(testFile, html);

    server.start(8080);

    var request = http.get("http://localhost:8080");
    
    request.on("response", function(response) {
        response.setEncoding("utf-8");
        response.on("data", function(chunk) {
            test.equals(html, chunk, "response");
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