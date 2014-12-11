define( [ "js/global/directive/DirectiveUtils", "bootstrap" ], function( DirectiveUtils ) {
	"use strict";
	
	function BootstrapModal( $timeout ) {
		return {
			restrict: "A",
			scope: {
				modalShow: "=",
				modalOnShow: "&",
				modalOnShown: "&",
				modalOnHide: "&",
				modalOnHidden: "&"
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
				
				element.on( "show.bs.modal", function() {
					$timeout(function() {
						if ( scope.modalOnShow ) {
							scope.modalOnShow();
						}
					});
				});
				
				element.on( "shown.bs.modal", function() {
					$timeout(function() {
						scope.modalShow = true;
						if ( scope.modalOnShown ) {
							scope.modalOnShown();
						}
					});
				});
				
				element.on( "hide.bs.modal", function() {
					$timeout(function() {
						if ( scope.modalOnHide ) {
							scope.modalOnHide();
						}
					});
				});
				
				element.on( "hidden.bs.modal", function() {
					$timeout(function() {
						scope.modalShow = false;
						if ( scope.modalOnHidden ) {
							scope.modalOnHidden();
						}
					});
				});
			}
		};
	}
	
	return [ "$timeout",  BootstrapModal ];
});
