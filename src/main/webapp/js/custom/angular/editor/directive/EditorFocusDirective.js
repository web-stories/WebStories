define(function() {
	"use strict";
	
	function EditorFocusDirective() {
		return {
			restrict: "A",
			scope: {
				trigger: "=focusIf"
			},
			link: function( scope, element, attrs ) {
				scope.$watch( "trigger", function( newValue ) {
					if ( newValue ) {
						element[ 0 ].focus();
					}
				});
			}
		};
	}
	
	return [ EditorFocusDirective ];
});
