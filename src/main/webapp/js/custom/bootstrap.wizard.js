define( ["jquery", "bootstrap", "jquery.ui.widget"], function( $ ) {
	"use strict";
	
	$.widget( "ws.wizard", {
		_create: function() {
			this._prevControl= this.element.find( ".wizard-control-prev" );
			this._nextControl = this.element.find( ".wizard-control-next" );
			this._on( this._prevControl, {
				"click": this.prev
			});
			this._on( this._nextControl, {
				"click": this.next
			});
		},
		_getCurrentStep: function() {
			return this.element.find( ".wizard-steps .active" ).index();
		},
		_getStepsNumber: function() {
			return this.element.find( ".wizard-pane" ).length;
		},
		_changeStep: function( oldIndex, activeIndex ) {
			var activeStep, activePane, oldPane, transition;
			transition = $.support.transition;
			activeStep = this.element.find( ".wizard-steps li" ).eq( activeIndex );
			activePane = this.element.find( ".wizard-pane" ).eq( activeIndex );
			oldPane = this.element.find( ".wizard-pane" ).eq( oldIndex );
			
			// TODO deal with fast step changes
			activeStep
				.prevAll()
				.removeClass( "active" )
				.addClass( "complete" );
			activeStep
				.nextAll()
				.removeClass( "active complete" );
			activeStep
				.removeClass( "complete" )
				.addClass( "active" );
				
			function change() {
				if ( transition ) {
					activePane[ 0 ].offsetWidth; // reflow for transition
					activePane.addClass( "in" );
				} else {
					activePane.removeClass( "fade" );
				}
			}
			
			oldPane
				.removeClass( "active" );
			activePane
				.removeClass( "in" )
				.addClass( "active" );
			
			if ( transition ) {
				activePane
					.one( "bsTransitionEnd", change )
					.emulateTransitionEnd( 150 );
			} else {
				change();
			}
		},
		prev: function() {
			var step = this._getCurrentStep();
			if ( step ) {
				this._changeStep( step, step - 1 );
			}
		},
		next: function() {
			var stepsNumber = this._getStepsNumber();
			var step = this._getCurrentStep();
			if ( step < stepsNumber - 1 ) {
				this._changeStep( step, step + 1 );
			}
		}
	});
});