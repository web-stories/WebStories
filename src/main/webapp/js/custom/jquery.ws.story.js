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
				this._impress.goto( this._currentStep + 1 );
			},
			"click .story-prev": function() {
				this._impress.goto( this._currentStep - 1 );
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
				this._currentStep = stepElement.index();
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
				stepsData: function() {
					var currentChapter = 1;
					var steps = this._steps = [];
					this.element
						.find( ".step" )
						.each(function( index, element ) {
							var obj = {};
							var step = $( element );
							if ( step.hasClass( "story-chapter" ) ) {
								currentChapter += 1;
							}
							if ( step.hasClass( "story-content-step" ) ) {
								obj.chapter = currentChapter;
							}
							steps.push( obj );
						});
				}
			};
			refresh.slideData.call( this );
			refresh.stepsData.call( this );
		}
	});
});
