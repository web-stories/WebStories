QUnit.config.autostart = false;
require( ["jquery", "jquery.simulate", "jquery.ws.editor"], function( $ ) {
	"use strict";
	start();
	module( "autosave" );
	asyncTest( "Should execute save callback when editing the section", function() {
		expect( 1 );
		var count = 0;
		
		$( "#simple" ).editor({
			save: function( chapters, resolve ) {
				count += 1;
				resolve({ chapters: chapters });
				return $.Deferred();
			}
		});
		
		$( "#simple .editor-chapter-section-text" )
			.val( "changed" )
			.simulate( "focus" )
			.simulate( "keydown" )
			.simulate( "keypress" )
			.simulate( "keyup" )
			.simulate( "blur" );
			
		setTimeout(function() {
			strictEqual( count, 1, "callback should be executed once" );
			start();
		}, 1 );
	});
	asyncTest( "Should not execute save callback when typing a character after the section " +
	"limit has been reached", function() {
		expect( 1 );
		var count = 0;
		
		$( "#section-overflow" ).editor({
			save: function( chapters, resolve ) {
				count += 1;
				resolve({ chapters: chapters });
				return $.Deferred();
			}
		});
		
		$( "#section-overflow .editor-chapter-section-text" )
			.simulate( "focus" )
			.simulate( "keydown" )
			.simulate( "keypress" )
			.simulate( "keyup" )
			.simulate( "blur" );
			
		setTimeout(function() {
			strictEqual( count, 0, "should not execute save callback" );
			start();
		}, 1 );
	});
});
