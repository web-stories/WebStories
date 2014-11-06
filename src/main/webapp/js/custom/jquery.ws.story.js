define( ["jquery", "jquery.ui.widget", "impress"], function( $ ) {
	"use strict";
	$.widget( "ws.story", {
		_create: function() {
			this._refresh();
			
			this.element
				.removeClass( "hidden" );
			
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
			"click .story-controls-prev-chapter": function() {
				var step = this._steps[ this._currentStep ];
				var chapter = this._chapters[ step.chapterIndex - 1 ];
				if ( !chapter ) {
					chapter = this._chapters[ 0 ];
				}
				this._impress.goto( chapter.step );
			},
			"click .story-controls-next-chapter": function() {
				var step = this._steps[ this._currentStep ];
				var chapter = this._chapters[ step.chapterIndex + 1 ];
				if ( !chapter ) {
					// No chapter left
					return;
				}
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
				this._changeMenuState( stepElement );
			}
		},
		_changeMenuState: function( stepElement ) {
			var chapterNumber;
			var step = this._steps[ this._currentStep ];
			var visibleChapterControls = stepElement.hasClass( "story-content-step" );
			
			this.element
				.find( ".story-controls-prev-chapter, .story-controls-next-chapter" )
				.toggleClass( "story-controls-visible", visibleChapterControls );
				
			this.element
				.find( ".story-prev" )
				.prop( "disabled", this._currentStep === 0 );
			this.element
				.find( ".story-next" )
				.prop( "disabled", this._currentStep === this._steps.length - 1 );
			
			if ( step.hasOwnProperty( "chapterIndex" ) ) {
				chapterNumber = step.chapterIndex + 1;
				this.element
					.find( ".story-controls-prev-chapter" )
					.text( chapterNumber - 1 < 1 ? 1 : chapterNumber - 1 );
				this.element
					.find( ".story-controls-next-chapter" )
					.text(
						chapterNumber + 1 > this._chapters.length ?
							this._chapters.length : chapterNumber + 1
					);
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
					var chapterIndex = -1;
					var steps = this._steps = [];
					var chapters = this._chapters = [];
					
					// steps
					this.element
						.find( ".step" )
						.each(function( index, element ) {
							var stepObj = {};
							var step = $( element );
							if ( step.hasClass( "story-chapter" ) ) {
								chapterIndex += 1;
							}
							if ( step.hasClass( "story-content-step" ) ) {
								stepObj.chapterIndex = chapterIndex;
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
