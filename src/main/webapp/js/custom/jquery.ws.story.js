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
				var step = this._steps[ this._currentStep ];
				var chapter = this._chapters[ step.chapterIndex - 1 ];
				this._impress.goto( chapter.step );
			},
			"click .story-menu-next-chapter": function() {
				var step = this._steps[ this._currentStep ];
				var chapter = this._chapters[ step.chapterIndex + 1 ];
				this._impress.goto( chapter.step );
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
					var chapterIndex = 0;
					var steps = this._steps = [];
					var chapters = this._chapters = [];
					
					// steps
					this.element
						.find( ".step" )
						.each(function( index, element ) {
							var stepObj = {};
							var step = $( element );
							if ( step.hasClass( "story-content-step" ) ) {
								stepObj.chapterIndex = chapterIndex;
							}
							if ( step.hasClass( "story-chapter" ) ) {
								chapterIndex += 1;
							}
							steps.push( stepObj );
						});
						
					// chapters
					this.element
						.find( ".step" )
						.each(function( index, element ) {
							var step = $( element );
							if ( step.hasClass( "story-chapter" ) ) {
								chapters.push({
									step: index
								});
							}
						});
				}
			};
			refresh.slideData.call( this );
			refresh.stepsData.call( this );
		}
	});
});
