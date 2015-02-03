define(function() {
	"use strict";
	function SlidesController( $rootScope, $scope, $document ) {
		$scope.story.slides = [];
		$scope.$watch( "story.slides", function( slides, oldSlides ) {
			if ( slides === oldSlides ) {
				return;
			}
			$rootScope.$broadcast( "slides:change" );
		}, true );
		$scope.$on( "slides:restructured", function( event, updateModel ) {
			var slidesGap = $document[ 0 ].documentElement.clientWidth * 2;
			updateModel( $scope.story, slidesGap );
		});
	}
	return [ "$rootScope", "$scope", "$document", SlidesController ];
});
