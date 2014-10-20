module.exports = function( grunt ) {
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
