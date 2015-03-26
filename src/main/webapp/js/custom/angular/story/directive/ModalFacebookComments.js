define( ["jquery"], function( $ ) {
	"use strict";
	
	function ModalFacebookComments() {
		return {
			restrict: "A",
			require: "^^bsModal",
			link: function( scope, element, attrs, modalController ) {
				var directiveContainer = $( element[ 0 ] );
				// Workaround for this potential bug:
				// https://developers.facebook.com/bugs/447391555424419/
				modalController.on( "shown.bs.modal", function() {
					FB.XFBML.parse( directiveContainer[ 0 ] );
				});
			}
		};
	}
	
	return [ ModalFacebookComments ];
});
