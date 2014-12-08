QUnit.config.autostart = false;

module( "KeyEvent" );
require([ "angular", "js/editor/factory/KeyEvent" ], function( angular, KeyEvent ) {
	start();
	
	module( "KeyEvent" );
	
	test( "Command keys should not be considered character related keys", function() {
		expect( 3 );
		var ctrlX = KeyEvent.create({
			ctrlKey: true,
			keyCode: 88
		});
		var ctrlC = KeyEvent.create({
			ctrlKey: true,
			keyCode: 67
		});
		var F1 = KeyEvent.create({
			keyCode: 112
		});
		strictEqual( ctrlX.isCharacter(), false, "ctrl + x should not be considered a character" );
		strictEqual( ctrlC.isCharacter(), false, "ctrl + c should not be considered a character" );
		strictEqual( F1.isCharacter(), false, "F1 should not be considered a character" );
	});
	
	test( "Text pasting should be considered a character related key", function() {
		expect( 1 );
		var ctrlV = KeyEvent.create({
			ctrlKey: true,
			keyCode: 86
		});
		strictEqual( ctrlV.isCharacter(), true, "ctrl + v should be considered a character" );
	});
	
	test( "Ensure some special keys are text manip keys", function() {
		expect( 3 );
		var BACKSPACE = KeyEvent.create({
			keyCode: 8
		});
		var DELETE = KeyEvent.create({
			keyCode: 46
		});
		var ctrlX = KeyEvent.create({
			ctrlKey: true,
			keyCode: 88
		});
		strictEqual( BACKSPACE.isTextManip(), true, "backspace should be considered text manip" );
		strictEqual( DELETE.isTextManip(), true, "delete should be considered text manip" );
		strictEqual( ctrlX.isTextManip(), true, "ctrl + x should be considered text manip" );
	});
});
