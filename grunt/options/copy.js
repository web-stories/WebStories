module.exports = function( grunt ) {
	"use strict";
	return {
		amdify: {
			options: {
				process: function( content, src ) {
					var partials = "src/main/webapp/js/amdify/partials";
					var folder = src.split( "/" ).slice( 0, -1 ).pop();
					var intro = grunt.file.read( partials + "/intro-" + folder + ".js" );
					var outro = grunt.file.read( partials + "/outro-" + folder + ".js" );
					return intro + content + outro;
				}
			},
			files: [{
				expand: true,
				cwd: "src/main/webapp/js/amdify/jquery",
				src: [ "**/*.js" ],
				dest: "src/main/webapp/static/js/"
			}, {
				expand: true,
				cwd: "src/main/webapp/js/amdify/angular",
				src: [ "**/*.js" ],
				dest: "src/main/webapp/static/js/"
			}, {
				expand: true,
				cwd: "src/main/webapp/js/amdify/angular-module",
				src: [ "**/*.js" ],
				dest: "src/main/webapp/static/js/"
			}]
		},
		js: {
			files: [{
				expand: true,
				cwd: "src/main/webapp/js/custom/",
				src: [ "*.js" ],
				dest: "src/main/webapp/static/js/"
			}, {
				expand: true,
				cwd: "src/main/webapp/js/custom/angular/",
				src: [ "**/*.js" ],
				dest: "src/main/webapp/static/js/"
			}, {
				expand: true,
				cwd: "src/main/webapp/js/vendor/",
				src: [ "**/*.js" ],
				dest: "src/main/webapp/static/js/"
			}]
		},
		css: {
			files: [{
				expand: true,
				cwd: "src/main/webapp/css/vendor/",
				src: [ "**/*.css" ],
				dest: "src/main/webapp/static/css/"
			}]
		}
	};
};
