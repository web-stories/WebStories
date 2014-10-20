module.exports = function( grunt ) {
	var baseURL = "http://localhost:8080/<%= servers.wildfly.options.preset %>";
	return {
		wildfly: {
			options: {
				urls: [
					baseURL + "/test/webapp/html/index.jsp"
				]
			}
		}
	};
};
