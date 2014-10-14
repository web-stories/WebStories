module.exports = function( grunt ) {
	"use strict";
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.initConfig({
		jshint: {
			files: [ "Gruntfile.js", "src/main/javascript/**/*.js", "src/test/javascript/**/*.js" ]
		}
	});
	grunt.registerTask( "default", ["jshint"] );
};