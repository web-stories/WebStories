define( [ "jquery", "jquery.ws.alert" ], function( $ ) {
	"use strict";
	function AlertDirective() {
		return {
			restrict: "E",
			scope: {
				data: "="
			},
			link: function( scope, element, attrs ) {
				scope.data = {
					error: {},
					validation: {}
				};
				
				element.actionAlert();
				
				scope.$watch( "data.show", function( newValue, oldValue ) {
					if ( newValue === oldValue ) {
						return;
					}
					
					var closeDelay;
					var show = newValue;
					
					if ( typeof show === "number" ) {
						closeDelay = show;
						show = undefined;
					}
					
					if ( show ) {
						element.actionAlert( "show" );
						return;
					}
					
					if ( closeDelay ) {
						element.actionAlert( "closeAfter", show );
						return;	
					}
				});
				
				scope.$watch( "data.error", function( newValue, oldValue ) {
					if ( newValue === oldValue ) {
						return;
					}
					
					var message = newValue.message;
					var response = newValue.response;
					
					element.actionAlert( "ajaxError", message, response );
				});
				
				scope.$watch( "data.validation", function( newValue, oldValue ) {
					if ( newValue === oldValue ) {
						return;
					}
					element.actionAlert( "ajaxValidation", newValue );
				});
			}
		};
	}
	
	return [ AlertDirective ];
});
