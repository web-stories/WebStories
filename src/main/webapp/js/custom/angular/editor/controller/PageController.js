define( [ "webstories" ], function( webstories ) {
	"use strict";
	
	function PageController( $scope ) {
		$scope.alert = {};
		$scope.previewModal = {};
		
		$scope.loadPreview = function( storyId, chapterPosition, sectionPosition ) {
			var context = webstories.contextPath;
			var path = "/view/stories/preview";
			var query = "id=" + storyId;
			var hash = "section-" + chapterPosition + "-" + sectionPosition;
			$scope.previewURL = context + path + "?" + query + "#" + hash;
		};
		
		$scope.unloadPreview = function() {
			$scope.previewURL = "about:blank";
		};
	}
	
	return [ "$scope", PageController ];
});
