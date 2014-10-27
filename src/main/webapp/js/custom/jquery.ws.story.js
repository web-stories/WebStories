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
					var docWidth = $( document ).width();
					element
						.find( ".step" )
						.width( docWidth )
						.each(function( index, slide ) {
							$( slide )
								.attr( "data-x", x );
							x += docWidth + 300;
						});
				}
			};
			refresh.slideData();
		}
	});
});
