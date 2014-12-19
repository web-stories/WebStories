define( [ "impress" ], function( impress ) {
	"use strict";
	
	function ImpressDirective( $timeout ) {
		return {
			restrict: "A",
			scope: {
				step: "=impressStep",
				init: "&impressInit",
				stepEnter: "&stepEnter",
				stepLeave: "&stepLeave"
			},
			link: function( scope, element, attrs ) {
				var instance = impress( element.attr( "id" ) );
				
				scope.$watch( "step", function( value ) {
					instance.goto( value );
				});
				
				element.on( "impress:init", function( event ) {
					$timeout(function() {
						var api = event.originalEvent.detail.api;
						if ( scope.init ) {
							scope.init({
								api: api
							});
						}
					});
				});
				
				element.find( ".step" ).on( "impress:stepenter", function() {
					$timeout(function() {
						if ( scope.stepEnter ) {
							scope.stepEnter();
						}
					});
				});
				
				element.find( ".step" ).on( "impress:stepleave", function() {
					$timeout(function() {
						if ( scope.stepLeave ) {
							scope.stepLeave();
						}
					});
				});
				
				instance.init();
			}
		};
	}
	
	return [ "$timeout", ImpressDirective ];
});
