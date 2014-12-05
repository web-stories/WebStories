QUnit.config.autostart = false;

module( "EditorSavingQueue" );
require([
	"angular",
	"js/editor/Init"
], function( angular, EditorSavingQueue ) {
	start();
	
	module( "EditorSavingQueue", {
		setup: function() {
			var injector = angular.injector([ "ng", "ws.editor" ]);
			this.rootScope = injector.get( "$rootScope" );
			this.service = injector.get( "EditorSavingQueue" );
			this.clock = sinon.useFakeTimers();
		},
		teardown: function() {
			this.clock.restore();
		}
	});
	
	test( "should execute second callback asynchronously if 'next' called", function() {
		expect( 2 );
		
		// Register callbacks
		this.service.queue(function first( next ) {
			ok( true, "should execute first callback immediately" );
			setTimeout( next, 10 );
		});
		this.service.queue(function second( next ) {
			ok( true, "should execute the second callback after 10ms" );
		});
		
		// Advance time
		this.clock.tick( 11 );
	});
	
	test( "should not execute second callback if 'next' is not called", function() {
		expect( 1 );
		
		this.service.queue([
			function first( next ) {
				ok( true, "should execute first callback immediately" );
			},
			function second( next ) {
				ok( false, "should NOT execute second callback because 'next' was not called" );
			}
		]);
	});
	
	test( "should execute later the second callback when registered after the first is " +
	"still executing", function() {
		expect( 3 );
		var executions = 0;
		
		this.service.queue(function first( next ) {
			executions += 1;
			setTimeout( next, 10 );
		});
		
		strictEqual( executions, 1, "should execute the first right after it is registered" );
		
		this.service.queue(function second( next ) {
			executions += 1;
			next();
		});
		
		strictEqual( executions, 1, "should NOT execute the second when the first is executing" );
		
		this.clock.tick( 11 );
		
		strictEqual( executions, 2, "should execute the second after the first is finished" );
	});
	
	test( "should broadcast 'editor:saved' after the last 'next' call if there is no items in " +
	"the queue", function() {
		var executions = 0;
		
		this.rootScope.$on( "editor:saved", function() {
			executions += 1;
		});
		
		this.service.queue(function first( next ) {
			setTimeout( next, 10 );
		});
		strictEqual( executions, 0, "should not broadcast before 'next' is called" );
		
		this.clock.tick( 11 );
		strictEqual( executions, 1, "should broadcast after 'next' is called" );
	});
});