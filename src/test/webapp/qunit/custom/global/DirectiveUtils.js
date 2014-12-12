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
	
	module( ".attrParams( obj )" );
	test( "Empty property should be ignored", function() {
		var result = DirectiveUtils.attrParams({ empty: "" });
		deepEqual( result, {}, "object should be empty" );
	});
	test( "Pass properties converting the type", function() {
		var result = DirectiveUtils.attrParams({ boolean: "false" });
		deepEqual( result, {
			boolean: false
		}, "object should be empty" );
	});
});