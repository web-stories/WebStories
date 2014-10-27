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
				},
				slideHeight: function() {
					var doc = $( document );
					var footer = element.find( ".story-footer" );
					var content = element.find( ".story-content" );
					var data = {
						offset: element.offset().top,
						document: doc.height(),
						footer: footer.height()
					};
					
					console.log( "---- slideHeight ----" );
					console.log( data );
					console.log( "---- slideHeight ----" );
					
					content.height( data.document - data.offset - data.footer );
				}
			};
			refresh.slideData();
			refresh.slideHeight();
		}
	});
});
