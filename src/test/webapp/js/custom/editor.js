QUnit.config.autostart = false;
require( ["jquery", "jquery.ws.editor"], function( $ ) {
	start();
	test( "Simple text", function() {
		ok( !!$( "#chapter-1" )[ 0 ] );
	});
});
