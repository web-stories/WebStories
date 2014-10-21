module.exports = function( grunt ) {
	"use strict";
	return {
		files: [
			"Gruntfile.js",
			"grunt/**/*.js",
			"src/main/webapp/js/custom/**/*.js",
			"src/test/webapp/js/custom/**/*.js",
			"src/main/webapp/jsp/pages/**/*.js"
		],
		options: {
			jshintrc: true
		}
	};
};
