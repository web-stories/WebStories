define(function() {
	"use strict";
	function SlidesController( $rootScope, $scope, $document, jmpress ) {
		$scope.story.slides = [];
		$scope.$watch( "story.slides", function( slides, oldSlides ) {
			if ( slides === oldSlides ) {
				return;
			}
			// Only trigger slide change if an actual change in slide activation was made
			// This prevent the broadcast of the event when the active step is not yet defined
			if ( jmpress.getActive( slides ) === undefined ) {
				return;
			}
			$rootScope.$broadcast( "slides:change" );
		}, true );
		$scope.$on( "slides:restructured", function( event, updateModel ) {
			var slidesGap = $document[ 0 ].documentElement.clientWidth * 2;
			updateModel( $scope.story, slidesGap );
		});
	}
	return [ "$rootScope", "$scope", "$document", "jmpress", SlidesController ];
});
