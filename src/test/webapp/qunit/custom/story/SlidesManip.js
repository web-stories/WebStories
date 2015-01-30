QUnit.config.autostart = false;

module( "Story" );
require([ "angular", "js/story/Init" ], function( angular ) {
	start();
	
	module( "SlidesManip", {
		setup: function() {
			var injector = angular.injector([ "ng", "ws.story" ]);
			this.service = injector.get( "SlidesManip" );
		}
	});
	
	test( "Get the slides of the last chapter", function() {
		expect( 1 );
		var slides = [{
			title: "first slide",
			chapter: 1
		}, {
			title: "second slide",
			chapter: 2
		}];
		deepEqual( this.service.findChapterSlides( slides, -1 ), [{
			title: "second slide",
			chapter: 2
		}], "Should get the slides of the last chapter" );
	});
	
	test( "Get the slides of a specific chapter", function() {
		expect( 1 );
		var slides = [{
			title: "first slide",
			chapter: 1
		}, {
			title: "second slide",
			chapter: 2
		}];
		deepEqual( this.service.findChapterSlides( slides, 1 ), [{
			title: "first slide",
			chapter: 1
		}], "Should get the slides of the first chapter" );
	});
	
	test( "Get the slides of a specific chapter when there's intro slides", function() {
		expect( 1 );
		var slides = [{
			title: "first slide",
			chapter: 0
		}, {
			title: "second slide",
			chapter: 1
		}];
		deepEqual( this.service.findChapterSlides( slides, 1 ), [{
			title: "second slide",
			chapter: 1
		}], "Should get the slides of the first chapter" );
	});
});