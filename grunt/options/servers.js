module.exports = function( grunt ) {
	return {
		wildfly: {
			options: {
				preset: "wildfly-8.1.0.Final"
			},
			files: [{
				expand: true,
				cwd: "src",
				src: [ "test/webapp/**/*" ]
			}, {
				expand: true,
				cwd: "src",
				src: [ "main/webapp/static/js/**/*" ]
			}]
		}
	};
};
