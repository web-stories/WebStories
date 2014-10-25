QUnit.config.autostart = false;
require( ["jquery", "jquery.ws.editor"], function( $ ) {
	"use strict";
	start();
	var methods = $.ws.editor.prototype;
	
	module( "keys" );
	
	test( "Invalid character keys", function() {
		expect( 2 );
		var ctrlX = methods._keyEvent({
			ctrlKey: true,
			keyCode: 88 // "x" character
		});
		var ctrlC = methods._keyEvent({
			ctrlKey: true,
			keyCode: 67 // "c" character
		});
		strictEqual( ctrlX.isCharacter(), false, "ctrl + x should not be a character" );
		strictEqual( ctrlC.isCharacter(), false, "ctrl + c should not be a character" );
	});
	
});
