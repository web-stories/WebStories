define(function() {
	"use strict";
	
	var keyCodes = {
		ALT: 18,
		ARROW_DOWN: 40,
		ARROW_LEFT: 37,
		ARROW_RIGHT: 39,
		ARROW_UP: 38,
		BACKSPACE: 8,
		CONTROL: 17,
		DELETE: 46,
		END: 35,
		ESC: 27,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		HOME: 36,
		MENU_KEY: 93,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		SHIFT: 16,
		TAB: 9,
		V: 86,
		WINDOWS_KEY: 91,
		X: 88
	};
	
	function KeyEvent( event ) {
		var typedCode = event.keyCode;
		
		/**
		 * Returns if this key event is supposed to add one or more characters in a text field
		 */
		this.isCharacter = function() {
			var i = 0;
			var valid = true;
			var invalidCharacters = [
				keyCodes.ALT,
				keyCodes.ARROW_DOWN,
				keyCodes.ARROW_LEFT,
				keyCodes.ARROW_RIGHT,
				keyCodes.ARROW_UP,
				keyCodes.BACKSPACE,
				keyCodes.CONTROL,
				keyCodes.DELETE,
				keyCodes.END,
				keyCodes.ESC,
				keyCodes.F1,
				keyCodes.F2,
				keyCodes.F3,
				keyCodes.F4,
				keyCodes.F5,
				keyCodes.F6,
				keyCodes.F7,
				keyCodes.F8,
				keyCodes.F9,
				keyCodes.F10,
				keyCodes.F11,
				keyCodes.F12,
				keyCodes.HOME,
				keyCodes.MENU_KEY,
				keyCodes.PAGE_DOWN,
				keyCodes.PAGE_UP,
				keyCodes.SHIFT,
				keyCodes.TAB,
				keyCodes.WINDOWS_KEY
			];
			
			// Check if character is invalid
			for ( ; i < invalidCharacters.length; i += 1 ) {
				if ( invalidCharacters[ i ] === typedCode ) {
					valid = false;
				}
			}
			
			// Invalidate any character if ctrl is pressed, ctrl means a command
			if ( event.ctrlKey ) {
				valid = false;
			}
			
			// But if the command is ctrl + v, then user is pasting content and it is a
			// character related command
			if ( event.ctrlKey && typedCode === keyCodes.V ) {
				valid = true;
			}
			
			return valid;
		};
		
		/**
		 * Returns if this key event is supposed to manipulate existing characters in a text field
		 */
		this.isTextManip = function() {
			var i = 0;
			var isCharacter = this.isCharacter();
			var manipKeys = [
				keyCodes.BACKSPACE,
				keyCodes.DELETE
			];
			
			if ( isCharacter ) {
				return true;
			}
			
			for ( ; i < manipKeys.length; i += 1 ) {
				if ( manipKeys[ i ] === typedCode ) {
					return true;
				}
			}
			
			// If user cut a content, then he is manipulating text
			if ( event.ctrlKey && typedCode === keyCodes.X ) {
				return true;
			}
			
			return false;
		};
	}
	
	return {
		create: function( event ) {
			return new KeyEvent( event );
		}
	};
});
