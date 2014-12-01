module.exports = function( grunt ) {
	"use strict";
	return {
		options: {
			sourceMap: true,
			sourceMapIncludeSources: true
		},
		files: {
			expand: true,
			cwd: "src/main/webapp/static/js/",
			src: [ "**/*.js" ],
			dest: "src/main/webapp/static/js/"
		}
	};
};
