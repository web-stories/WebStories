module.exports = function( grunt ) {
	"use strict";
	
	var options = {
		config: {
			src: "grunt/options/*.js"
		}
	};
	
	// Load grunt tasks configurations
	var configs = require( "load-grunt-configs" )( grunt, options );
	grunt.initConfig( configs );
	
	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );
	
	// Main tasks
	grunt.registerTask( "files", [ "concat", "copy", "uglify", "cssmin" ] );
	grunt.registerTask( "validate", [ "jshint", "jscs" ] );
	grunt.registerTask( "unit", [ "connect:main", "qunit" ] );
	
	// Special tasks
	grunt.registerTask( "dev", [ "connect:dev" ] );
	grunt.registerTask( "eclipse", [ "concat", "copy", "validate" ] );
	grunt.registerTask( "default", [ "validate", "files", "unit" ] );
};
