QUnit.config.autostart = false;
require( ["jquery", "jquery.simulate", "jquery.ws.editor"], function( $ ) {
	"use strict";
	start();
	module( "autosave", {
		setup: function() {
			this.writeSection = function( text ) {
				$( "#autosave .editor-chapter-section-text" )
					.val( text )
					.simulate( "keyup" )
					.simulate( "blur" );
			};
		}
	});
	asyncTest( "Should execute autosave callback when editing the section", function() {
		expect( 1 );
		$( "#autosave" ).editor({
			autosave: function( chapters, resolve ) {
				start();
				ok( true, "callback executed" );
				resolve({
					chapters: chapters
				});
				return $.Deferred();
			}
		});
		this.writeSection( "changed" );
	});
});
