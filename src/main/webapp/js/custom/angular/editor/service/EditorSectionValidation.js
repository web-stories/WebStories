define(function() {
	"use strict";
	
	function SectionContent( text ) {
		var limitChars = 660;
		
		this.validLength = function() {
			return this.remainingChars() > 0;
		};
		
		this.remainingChars = function() {
			var char;
			var i = 0;
			var count = 0;
			for ( ; i < text.length; i += 1 ) {
				char = text.charAt( i );
				if ( char === "\n" ) {
					count += 55;
				} else {
					count += 1;
				}
			}
			return limitChars - count;
		};
		
		this.remainingPercent = function() {
			var current = this.remainingChars( text );
			return current * 100 / limitChars;
		};
	}
	
	function EditorSectionValidation( KeyEvent ) {
		this.getValidityText = function( text ) {
			var content = new SectionContent( text );
			if ( content.remainingChars() < 0 ) {
				return "Ultrapassado o limite da seção.";
			} else if ( content.remainingPercent() < 50 ) {
				return content.remainingChars() + " caractere(s) restante(s).";
			}
		};
		
		this.getValidityClassName = function( text ) {
			var content = new SectionContent( text );
			return content.remainingChars() < 0 ? "has-warning" : "";
		};
		
		this.preventTyping = function( event, text ) {
			var keyEvent = KeyEvent.create( event );
			var content = new SectionContent( text );
			if ( !content.validLength() && keyEvent.isTextManip() && keyEvent.isCharacter() ) {
				return true;
			}
			return false;
		};
	}
	
	return [ "KeyEvent", EditorSectionValidation ];
});
