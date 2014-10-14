module.exports = function( grunt, options ) {
	var webapp = options.webapp;
	return {
		files: [
			"Gruntfile.js",
			"grunt/**/*.js",
			"src/main/webapp/js/custom/**/*.js",
			"src/main/webapp/jsp/pages/**/*.js"
		],
		options: {
			jshintrc: true
		}
	};
};