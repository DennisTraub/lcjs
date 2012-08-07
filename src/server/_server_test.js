// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var assert = require("assert");

exports.testNothing = function(test) {
	assert.equal(server.number(), 3, "number");
	test.done();
};