// Copyright (c) 2012 Dennis Traub. All rights reserved. See LICENSE.txt for details.

/*global desc, task, jake, fail, complete */

(function() {
	"use strict";

	var GENERATED_DIR = "generated";
	var	TEMP_TESTFILE_DIR = GENERATED_DIR + "/test";

//	desc("Ensure correct version of node is present");
	task("node", [], function() {
		var requiredNodeVersion = 'v0.8';
		if (process.version.substr(0, 4) !== requiredNodeVersion.substr(0, 4))
			fail("Incorrect node version. Expected " + requiredNodeVersion + ".*");
	});

	desc("Lint everything");
	task("lint", ["node"], function() {
		var lint = require("./build/lint/lint_runner.js");

		var files = new jake.FileList();
		files.include("**/*.js");
		files.exclude("node_modules");

		var options = nodeLintOptions();

		var passed = lint.validateFileList(files.toArray(), options, {});
		if (!passed) fail("Lint failed");
	});

	desc("Create directory for tests");
	task("create_temp_dirs", ["lint"], function() {
		jake.mkdirP(TEMP_TESTFILE_DIR);
	});

	desc("Test everything");
	task("test", ["node", "create_temp_dirs"], function() {
		var reporter = require("nodeunit").reporters["default"];
		reporter.run(['src/server/_server_test.js'], null, function(failures) {
			if (failures) fail("Tests failed");
			complete();
		});
	}, { async: true });

	desc("Delete all generated files");
	task("clean", ["test"], function() {
		jake.rmRf(GENERATED_DIR);
	});

	desc("Build and test");
	task("default", ["lint", "test", "clean"]);

	desc("Integrate");
	task("integrate", ["default"], function() {
		console.log("1. Make sure 'git status' is clean.");
		console.log("2. Build on the integration box.");
		console.log("   a. Walk over to integration box.");
		console.log("   b. 'git pull'");
		console.log("   c. 'jake'");
		console.log("   d. If jake fails, stop! Try again after fixing the issue.");
		console.log("3. 'git checkout integration'");
		console.log("4. 'git merge master --no-ff --log'");
		console.log("5. 'git checkout master'");
	});



	function nodeLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: true,
			node: true
		};
	}
}());