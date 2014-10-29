QUnit.config.autostart = false;
require( ["jquery", "jquery.ws.editor"], function( $ ) {
	"use strict";
	start();
	var methods = $.ws.editor.prototype;
	
	module( "keys" );
	
	test( "Command keys should not be considered character related keys", function() {
		expect( 3 );
		var ctrlX = methods._keyEvent({
			ctrlKey: true,
			keyCode: 88 // "x" character
		});
		var ctrlC = methods._keyEvent({
			ctrlKey: true,
			keyCode: 67 // "c" character
		});
		var F1 = methods._keyEvent({
			keyCode: 112 // "F1" key
		});
		strictEqual( ctrlX.isCharacter(), false, "ctrl + x should not be considered a character" );
		strictEqual( ctrlC.isCharacter(), false, "ctrl + c should not be considered a character" );
		strictEqual( F1.isCharacter(), false, "F1 should not be considered a character" );
	});
	
	test( "Text pasting should be considered a character related key", function() {
		expect( 1 );
		var ctrlV = methods._keyEvent({
			ctrlKey: true,
			keyCode: 86 // "v" character
		});
		strictEqual( ctrlV.isCharacter(), true, "ctrl + v should be considered a character" );
	});
	
	test( "Text manip keys", function() {
		expect( 2 );
		var BACKSPACE = methods._keyEvent({
			keyCode: 8
		});
		var DELETE = methods._keyEvent({
			keyCode: 46
		});
		strictEqual( BACKSPACE.isTextManip(), true, "backspace should be considered text manip" );
		strictEqual( DELETE.isTextManip(), true, "delete should be considered text manip" );
	});
});
