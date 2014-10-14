module.exports = function( grunt, options ) {
	return {
		files: {
			"src/main/webapp/static/css/app.css": [
				"src/main/webapp/css/custom/app.css",
				"src/main/webapp/css/custom/header.css",
				"src/main/webapp/css/custom/bootstrap.wizard.css",
				"src/main/webapp/css/custom/authentication.css",
				"src/main/webapp/css/custom/story-thumb.css",
				"src/main/webapp/css/custom/toolbar.css",
				"src/main/webapp/css/custom/editor.css",
				"src/main/webapp/css/custom/editor-title.css",
				"src/main/webapp/css/custom/editor-tabs.css",
				"src/main/webapp/css/custom/editor-section.css",
				"src/main/webapp/css/custom/editor-chapter.css",
				"src/main/webapp/css/custom/alert.saving.css"
			]
		}
	};
};