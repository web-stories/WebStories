module.exports = function( grunt ) {
	return {
		js: {
			files: [{
				expand: true,
				cwd: "src/main/webapp/js/custom/",
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
