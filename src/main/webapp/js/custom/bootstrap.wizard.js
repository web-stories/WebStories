define( ["jquery", "bootstrap", "jquery.ui.widget"], function( $ ) {
	"use strict";
	
	$.widget( "ws.wizard", {
		_create: function() {
			this._refresh();
		},
		_transitioning: {
			step: false,
			pane: false
		},
		_activatePane: function( activeStep ) {
			var oldStep = this._currentStep;
			var oldPane = this.element.find( ".wizard-pane" ).eq( oldStep );
			var activePane = this.element.find( ".wizard-pane" ).eq( activeStep );
			var activate = $.proxy(function() {
				activePane[ 0 ].offsetWidth; // reflow for transition
				activePane.addClass( "in" );
				this._transitioning.pane = false;
			}, this );
			oldPane
				.removeClass( "active in" );
			activePane
				.addClass( "active" )
				.one( "bsTransitionEnd", activate )
				.emulateTransitionEnd( 150 );
			this._transitioning.pane = true;
		},
		_activatePrevStep: function( prev ) {
			var activeElement = this.element.find( ".wizard-steps > li.active" );
			var transitionEnd = $.proxy(function() {
				this._transitioning.step = false;
			}, this );
			this.element.find( ".wizard-steps > li" ).eq( prev )
				.removeClass( "complete" )
				.addClass( "active" );
			activeElement
				.removeClass( "active" )
				.one( "bsTransitionEnd", transitionEnd )
				.emulateTransitionEnd( 300 );
			this._transitioning.step = true;
		},
		_activateNextStep: function( next ) {
			var nextElement = this.element.find( ".wizard-steps > li" ).eq( next );
			var transitionEnd = $.proxy(function() {
				this._transitioning.step = false;
			}, this );
			this.element.find( ".wizard-steps > li.active" )
				.removeClass( "active" )
				.addClass( "complete" );
			nextElement
				.addClass( "active" )
				.one( "bsTransitionEnd", transitionEnd )
				.emulateTransitionEnd( 300 );
			this._transitioning.step = true;
		},
		_refresh: function() {
			this._prevControl= this.element.find( ".wizard-control-prev" );
			this._nextControl = this.element.find( ".wizard-control-next" );
			this._jumpControl = this.element.find( ".wizard-control-jump" );
			this._currentStep = this.element.find( ".wizard-steps .active" ).index();
			this._stepsNumber = this.element.find( ".wizard-steps li" ).length;
			
			this._off( this._prevControl, "click" );
			this._off( this._nextControl, "click" );
			this._off( this._jumpControl, "click" );
			
			this._on( this._prevControl, {
				"click": this.prev
			});
			this._on( this._nextControl, {
				"click": this.next
			});
			this._on( this._jumpControl, {
				"click": this.jump
			});
		},
		_beforeStepChange: function() {
			if ( this._transitioning.step || this._transitioning.pane ) {
				return false;
			}
		},
		_stepChange: function() {
			this._handleFirstStep();
			this._handleLastStep();
		},
		_handleFirstStep: function() {
			if ( this._firstStep() ) {
				this._prevControl
					.blur()
					.prop( "disabled", true );
				this._jumpControl
					.removeClass( "hidden" );
			} else {
				this._prevControl
					.prop( "disabled", false );
				this._jumpControl
					.addClass( "hidden" );
			}
		},
		_handleLastStep: function() {
			var dataLast = this._nextControl.data( "last" );
			var dataContent = this._nextControl.data( "content" );
			var content = this._nextControl.html();
			if ( this._lastStep() ) {
				this._nextControl
					.removeClass( "btn-default" )
					.addClass( "btn-success" );
				if ( dataLast ) {
					this._nextControl
						.data( "content", content )
						.text( dataLast );
				}
			} else {
				this._nextControl
					.removeClass( "btn-success" )
					.addClass( "btn-default" );
				if ( dataContent ) {
					this._nextControl
						.html( dataContent );
				}
			}
		},
		_lastStep: function() {
			var last = this._stepsNumber - 1;
			var current = this._currentStep;
			return current === last;
		},
		_firstStep: function() {
			return this._currentStep === 0;
		},
		_destroy: function() {
			this._nextControl
				.removeData( "content" );
		},
		prev: function() {
			var prev;
			if ( this._beforeStepChange() === false ) {
				return;
			}
			if ( !this._firstStep() ) {
				prev = this._currentStep - 1;
				this._activatePane( prev );
				this._activatePrevStep( prev );
				this._currentStep = prev;
				this._stepChange();
			}
		},
		next: function() {
			var next;
			if ( this._beforeStepChange() === false ) {
				return;
			}
			if ( !this._lastStep() ) {
				next = this._currentStep + 1;
				this._activatePane( next );
				this._activateNextStep( next );
				this._currentStep = next;
				this._stepChange();
			} else {
				this._trigger( "finish" );
			}
		},
		jump: function() {
			this._trigger( "jump" );
		}
	});
});