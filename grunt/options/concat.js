module.exports = function( grunt ) {
	"use strict";
	return {
		css: {
			files: {
				"src/main/webapp/static/css/webstories.css": [
					// Base
					"src/main/webapp/css/custom/app.css",
					
					// Story editor
					"src/main/webapp/css/custom/editor.css",
					"src/main/webapp/css/custom/editor-title.css",
					"src/main/webapp/css/custom/editor-tabs.css",
					"src/main/webapp/css/custom/editor-section.css",
					"src/main/webapp/css/custom/editor-chapter.css",
					
					// Story viewer
					"src/main/webapp/css/custom/story-simple.css",
					"src/main/webapp/css/custom/story-enhanced.css",
					
					// Other components
					"src/main/webapp/css/custom/header.css",
					"src/main/webapp/css/custom/bootstrap.wizard.css",
					"src/main/webapp/css/custom/authentication.css",
					"src/main/webapp/css/custom/story-thumb.css",
					"src/main/webapp/css/custom/toolbar.css",
					"src/main/webapp/css/custom/alerts.css"
				]
			}
		},
		js: {
			files: {
				"src/main/webapp/static/js/polyfills.js": [
					// PhantomJS
					"src/main/webapp/js/polyfills/bind.js",
					// Browsers that lack a console
					"src/main/webapp/js/polyfills/console.js",
					// IE <= 11
					"src/main/webapp/js/polyfills/promise.js"
				]
			}
		}
	};
};
