QUnit.config.autostart = false;

require([ "js/global/directive/DirectiveUtils" ], function( DirectiveUtils ) {
	start();
	
	module( ".toType( string )" );
	test( "Convert boolean", function() {
		var result = DirectiveUtils.toType( "false" );
		strictEqual( result, false );
	});
	test( "Convert number", function() {
		var result = DirectiveUtils.toType( "50" );
		strictEqual( result, 50 );
	});
	
	module( ".param( obj )" );
	test( "Pass properties converting the type", function() {
		var result = DirectiveUtils.param({ boolean: "false" });
		deepEqual( result, {
			boolean: false
		}, "object should be empty" );
	});
});