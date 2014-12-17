define(function() {
	"use strict";
	
	function StoryController( $scope ) {
		$scope.slides = [{
			type: "intro",
			title: "The placeholder",
			summary: "A placeholder story",
			chapter: 0,
			section: 0
		}, {
			type: "chapter",
			title: "The first chapter from a placeholder",
			chapter: 1,
			section: 0
		}, {
			type: "section",
			chapter: 1,
			section: 1,
			text: "Once there was this placeholder, and he was very lonely"
		}, {
			type: "section",
			chapter: 1,
			section: 2,
			text: "So lonely a new section had to be created!"
		}, {
			type: "chapter",
			chapter: 2,
			section: 0
		}];
	}
	
	return [ "$scope", StoryController ];
});
