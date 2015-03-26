define( [ "js/global/directive/DirectiveUtils", "bootstrap" ], function( DirectiveUtils ) {
	"use strict";
	
	function BootstrapModal( $timeout ) {
		return {
			restrict: "A",
			scope: {
				isOpen: "=",
				onShow: "&",
				onShown: "&",
				onHide: "&",
				onHidden: "&",
				show: "@",
				backdrop: "@",
				keyboard: "@"
			},
			controller: [ "$scope", "$element", function( $scope, $element ) {
				this.on = function( name, callback ) {
					return $element.on( name, function() {
						$timeout( callback );
					});
				};
			}],
			link: function( scope, element, attrs ) {
				var options = DirectiveUtils.param({
					backdrop: scope.backdrop,
					keyboard: scope.keyboard,
					show: scope.show
				});
				element.modal( options );
				
				scope.$watch( "isOpen", function( value ) {
					element.modal( value === true ? "show" : "hide" );
				});
				
				element.on( "show.bs.modal", function() {
					if ( scope.onShow ) {
						$timeout( scope.onShow );
					}
				});
				
				element.on( "shown.bs.modal", function() {
					if ( scope.onShown ) {
						$timeout( scope.onShown );
					}
				});
				
				element.on( "hide.bs.modal", function() {
					// Update the open state when the modal is closed from outside an
					// angular digest cycle
					delete scope.isOpen;
					
					if ( scope.onHide ) {
						$timeout( scope.onHide );
					}
				});
				
				element.on( "hidden.bs.modal", function() {
					if ( scope.onHidden ) {
						$timeout( scope.onHidden );
					}
				});
			}
		};
	}
	
	return [ "$timeout",  BootstrapModal ];
});
