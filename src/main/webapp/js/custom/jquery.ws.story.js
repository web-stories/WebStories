define( ["jquery", "jquery.ui.widget", "impress"], function( $ ) {
	"use strict";
	$.widget( "ws.storyViewer", {
		_create: function() {
			this._refresh();
			impress( "slides-container" ).init();
		},
		_refresh: function() {
			var element = this.element;
			var refresh = {
				slideData: function() {
					var x = 0;
					var z = 0;
					var docWidth = $( document ).width();
					var docHeight = $( document ).height();
					element
						.find( ".step" )
						.width( docWidth )
						.each(function( index, slide ) {
							slide = $( slide );
							var credit = slide.hasClass( "story-credits" );
							slide
								.attr( "data-x", x )
								.attr( "data-z", z );
							if ( credit ) {
								z -= 3000;
							} else {
								x += docWidth + 300;
							}
						});
				}
			};
			refresh.slideData();
		}
	});
});
