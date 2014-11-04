define( ["jquery", "jquery.ui.widget", "impress"], function( $ ) {
	"use strict";
	$.widget( "ws.storyViewer", {
		_create: function() {
			this._refresh();
			
			this._impress = impress( "slides-container" );
			this._impress.init();
			
			this._on( this.element, this._menuEvents );
			this._on( this.element, this._impressEvents );
		},
		_menuEvents: {
			"click .story-next": function() {
				this._impress.next();
			},
			"click .story-prev": function() {
				this._impress.prev();
			},
			"click .story-menu-prev-chapter": function() {
				// TODO
			},
			"click .story-menu-next-chapter": function() {
				// TODO
			},
			"click .story-stop": function() {
				this._impress.goto( 0 );
			}
		},
		_impressEvents: {
			"impress:stepenter .step": function( event ) {
				var stepElement = $( event.currentTarget );
				// TODO
			}
		},
		_refresh: function() {
			var refresh = {
				slideData: function() {
					var x = 0;
					var width = $( window ).width() * 2;
					this.element
						.find( ".step" )
						.each(function( index, slide ) {
							$( slide )
								.attr( "data-x", x );
							x += width;
						});
				},
				storyData: function() {
					var story = this._story = {};
					var steps = this.element.find( ".step" );
					this.element
						.find( ".story-chapter" )
						.each(function( index, element ) {
							var chapter = $( element );
							story.chapters = story.chapters || [];
							story.chapters.push({
								number: index + 1,
								step: steps.index( chapter )
							});
						});
				}
			};
			refresh.slideData.call( this );
			refresh.storyData.call( this );
		}
	});
});
