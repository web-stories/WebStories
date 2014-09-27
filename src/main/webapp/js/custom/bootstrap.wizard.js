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
		_activatePane: function( oldStep, activeStep ) {
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
				.emulateTransitionEnd( 500 );
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
				.emulateTransitionEnd( 500 );
			this._transitioning.step = true;
		},
		_refresh: function() {
			this._prevControl= this.element.find( ".wizard-control-prev" );
			this._nextControl = this.element.find( ".wizard-control-next" );
			this._currentStep = this.element.find( ".wizard-steps .active" ).index();
			this._stepsNumber = this.element.find( ".wizard-steps li" ).length;
			
			this._off( this._prevControl, "click" );
			this._off( this._nextControl, "click" );
			
			this._on( this._prevControl, {
				"click": this.prev
			});
			this._on( this._nextControl, {
				"click": this.next
			});
		},
		_beforeStepChange: function() {
			if ( this._transitioning.step || this._transitioning.pane ) {
				return false;
			}
		},
		prev: function() {
			if ( this._beforeStepChange() === false ) {
				return;
			}
			var current = this._currentStep;
			var prev = current - 1;
			if ( current ) {
				this._activatePane( current, prev );
				this._activatePrevStep( prev );
				this._currentStep = prev;
			}
		},
		next: function() {
			if ( this._beforeStepChange() === false ) {
				return;
			}
			var last = this._stepsNumber - 1;
			var current = this._currentStep;
			var next = current + 1;
			if ( current < last ) {
				this._activatePane( current, next );
				this._activateNextStep( next );
				this._currentStep = next;
			}
		}
	});
});