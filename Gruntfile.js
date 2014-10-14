module.exports = function( grunt ) {
	"use strict";
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.initConfig({
		jshint: {
			files: [
				"Gruntfile.js",
				"src/main/webapp/js/custom/**/*.js",
				"src/main/webapp/jsp/pages/**/*.js",
				"src/test/javascript/**/*.js"
			],
			options: {
				jshintrc: true
			}
		}
	});
	grunt.registerTask( "default", ["jshint"] );
};