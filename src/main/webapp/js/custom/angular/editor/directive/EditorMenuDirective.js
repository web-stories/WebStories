define( [ "jquery", "bootstrap" ], function( $ ) {
	"use strict";
	return function() {
		return {
			restrict: "A",
			link: function( scope, menu, attrs ) {
				// Menu should hold its width after pulled out from the DOM with affix
				menu.width( menu.width() );
				
				menu.affix({
					offset: {
						top: menu.offset().top - 20 /* Account for affix top gap */
					}
				});
				
				$( "body" ).scrollspy({
					target: "#chapter-menu",
					offset: 150
				});
			}
		};
	};
});
