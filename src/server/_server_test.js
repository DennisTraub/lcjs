// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");

exports.testNothing = function(test) {
	test.equals(3, server.number(), "number");
	test.done();
};