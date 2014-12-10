define( [ "jquery", "bootstrap" ], function( $ ) {
	"use strict";
	return function() {
		return {
			restrict: "A",
			link: function( scope, menu, attrs ) {
				var navbarHeight = $( ".header-navbar" ).outerHeight( true );
				
				// Menu should hold its width after pulled out from the DOM with affix
				menu.width( menu.width() );
				
				menu.affix({
					offset: {
						top: menu.offset().top - navbarHeight
					}
				});
				
				$( "body" ).scrollspy({
					target: "#chapter-menu",
					offset: navbarHeight + 150
				});
			}
		};
	};
});
