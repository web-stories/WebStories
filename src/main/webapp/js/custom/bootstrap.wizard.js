define( ["jquery", "bootstrap", "jquery.ui.widget"], function( $ ) {
	"use strict";
	
	$.widget( "ws.wizard", {
		_create: function() {
			this._refresh();
		},
		_activatePane: function( oldStep, activeStep ) {
			var oldPane = this.element.find( ".wizard-pane" ).eq( oldStep );
			var activePane = this.element.find( ".wizard-pane" ).eq( activeStep );
			
			function activate() {
				activePane[ 0 ].offsetWidth; // reflow for transition
				activePane.addClass( "in" );
			}
			
			oldPane
				.removeClass( "active in" );
			activePane
				.addClass( "active" )
				.one( "bsTransitionEnd", activate )
				.emulateTransitionEnd( 150 );
				
			this._currentStep = activeStep;
		},
		_activatePrevStep: function( prev ) {
			this.element.find( ".wizard-steps > li.active" )
				.removeClass( "active" );
			this.element.find( ".wizard-steps > li" ).eq( prev )
				.removeClass( "complete" )
				.addClass( "active" );
		},
		_activateNextStep: function( next ) {
			this.element.find( ".wizard-steps > li.active" )
				.removeClass( "active" )
				.addClass( "complete" );
			this.element.find( ".wizard-steps > li" ).eq( next )
				.addClass( "active" );
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
		prev: function() {
			var current = this._currentStep;
			var prev = current - 1;
			if ( current ) {
				this._activatePane( current, prev );
				this._activatePrevStep( prev );
			}
		},
		next: function() {
			var last = this._stepsNumber - 1;
			var current = this._currentStep;
			var next = current + 1;
			if ( current < last ) {
				this._activatePane( current, next );
				this._activateNextStep( next );
			}
		}
	});
});