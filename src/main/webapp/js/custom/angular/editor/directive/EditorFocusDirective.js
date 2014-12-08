define(function() {
	"use strict";
	
	function EditorFocusDirective() {
		return {
			restrict: "A",
			scope: {
				callbackBefore: "&",
				trigger: "=focusIf"
			},
			link: function( scope, element, attrs ) {
				scope.$watch( "trigger", function( newValue ) {
					scope.callbackBefore();
					
					if ( newValue ) {
						element[ 0 ].focus();
					}
				});
			}
		};
	}
	
	return [ EditorFocusDirective ];
});
