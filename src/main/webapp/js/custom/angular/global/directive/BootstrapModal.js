define( [ "js/global/directive/DirectiveUtils", "bootstrap" ], function( DirectiveUtils ) {
	"use strict";
	
	function BootstrapModal( $parse ) {
		return {
			restrict: "A",
			scope: {
				modalShow: "="
			},
			link: function( scope, element, attrs ) {
				var options = DirectiveUtils.attrParams({
					backdrop: attrs.modalOptionsBackdrop,
					keyboard: attrs.modalOptionsKeyboard,
					show: attrs.modalOptionsShow
				});
				
				element.modal( options );
				
				scope.$watch( "modalShow", function( value ) {
					if ( value === true ) {
						element.modal( "show" );
					} else if ( value === false ) {
						element.modal( "hide" );
					}
				});
				
				element.on( "hidden.bs.modal", function() {
					scope.$apply(function( scope ) {
						scope.modalShow = false;
					});
				});
				
				element.on( "shown.bs.modal", function() {
					scope.$apply(function( scope ) {
						scope.modalShow = true;
					});
				});
			}
		};
	}
	
	return [ "$parse", BootstrapModal ];
});
