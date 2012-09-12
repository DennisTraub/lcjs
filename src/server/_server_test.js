// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");
var fs = require("fs");

var stop_server_and_finish_test = function(server, test) {
    server.stop(function() {
        test.done();
    });
};

var start = function(server) {
    server.start(8080);
};

exports.test_server_serves_a_file = function(test) {
    var html = "<html><body><p>Test file</p></body></html>";

    var testFile = "generated/test/test.html";

    fs.writeFileSync(testFile, html);

    start(server);

    var request = http.get("http://localhost:8080");
    
    request.on("response", function(response) {
        response.setEncoding("utf-8");
        response.on("data", function(chunk) {
            test.equals(html, chunk, "response");
        });
        response.on("end", function() {
            stop_server_and_finish_test(server, test);
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
	start(server);
	stop_server_and_finish_test(server, test);
};

exports.test_stopCalledWhenServerIsntRunningThrowsException = function(test) {
	test.throws(function() {
		server.stop();
	});
    test.done();
};