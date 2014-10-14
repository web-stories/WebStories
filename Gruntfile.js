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
	
	grunt.registerTask( "default", [ "files", "validate" ] );
	
	grunt.registerTask( "files", [ "concat", "copy" ] );
	grunt.registerTask( "validate", [ "jshint", "jscs" ] );
	
	grunt.registerTask( "eclipse", [ "concat", "copy" ] );
};
