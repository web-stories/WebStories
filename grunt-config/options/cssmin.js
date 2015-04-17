module.exports = function( grunt ) {
	"use strict";
	return {
		options: {
			keepSpecialComments: 0
		},
		files: {
			expand: true,
			cwd: "src/main/webapp/static/css/",
			src: ["*.css"],
			dest: "src/main/webapp/static/css/"
		}
	};
};
