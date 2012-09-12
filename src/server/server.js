// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(portNumber) {
    if (!portNumber) throw "port number is missing";
    
	server = http.createServer();
	server.on("request", function(request, response) {
        fs.readFile("generated/test/test.html", function(err, data) {
            if (err) throw err;
            response.end(data);
        });
	});

	server.listen(portNumber);
};

exports.stop = function(callback) {
	server.close(callback);
};