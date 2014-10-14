module.exports = function( grunt ) {
	"use strict";
	
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
	
	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );
	
	grunt.registerTask( "default", ["jshint"] );
};