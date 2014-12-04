module.exports = function( grunt ) {
	"use strict";
	return {
		qunit: {
			options: {
				urls: [
					"http://localhost:8000/test/webapp/qunit/custom/editor/EditorSavingQueue.html",
					"http://localhost:8000/test/webapp/qunit/custom/editor/EditorModel.html"
				]
			}
		}
	};
};
