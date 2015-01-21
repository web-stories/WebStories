QUnit.config.autostart = false;

module( "Story" );
require([ "angular", "js/story/Init" ], function( angular ) {
	start();
	
	module( "ControlsManip", {
		setup: function() {
			var injector = angular.injector([ "ng", "ws.story" ]);
			this.service = injector.get( "ControlsManip" );
		}
	});
	
	test( "Get the next and prev chapter number", function() {
		var slides = [{
			chapter: 3
		}, {
			chapter: 4,
			active: true
		}, {
			chapter: 5
		}];
		var siblings = this.service.findChapterSiblings( slides );
		strictEqual( siblings.prevChapter, 3, "Should get the correct prev chapter" );
		strictEqual( siblings.nextChapter, 5, "Should get the correct next chapter" );
	});
	
	test( "Get the next and prev chapter number for the intro slide", function() {
		var slides = [{
			chapter: 0,
			active: true
		}, {
			chapter: 1
		}];
		var siblings = this.service.findChapterSiblings( slides );
		strictEqual(
			siblings.prevChapter,
			undefined,
			"Should not have any prev chapter number for intro slide"
		);
		strictEqual(
			siblings.nextChapter,
			undefined,
			"Should not have any next chapter number for intro slide"
		);
	});
	
	test( "Get the next and prev chapter number for the first slide", function() {
		var slides = [{
			chapter: 0
		}, {
			chapter: 1,
			active: true
		}, {
			chapter: 2
		}];
		var siblings = this.service.findChapterSiblings( slides );
		strictEqual(
			siblings.prevChapter,
			undefined,
			"Should not have any prev chapter number for first slide"
		);
		strictEqual(
			siblings.nextChapter,
			2,
			"Should have the correct next chapter"
		);
	});
	
	test( "Get the next and prev chapter number when there is no active slide yet", function() {
		var slides = [];
		var siblings = this.service.findChapterSiblings( slides );
		strictEqual(
			siblings.prevChapter,
			undefined,
			"Should not have any prev chapter when there's no active slide yet"
		);
		strictEqual(
			siblings.nextChapter,
			undefined,
			"Should not have any next chapter when there's no active slide yet"
		);
	});
	
	test( "Get the next and prev chapter number for the last available chapter", function() {
		var slides = [{
			chapter: 1
		}, {
			chapter: 2,
			active: true
		}];
		var siblings = this.service.findChapterSiblings( slides );
		strictEqual(
			siblings.prevChapter,
			1,
			"Should get the correct prev chapter for the last available chapter"
		);
		strictEqual(
			siblings.nextChapter,
			undefined,
			"Should not have any next chapter for the last available chapter"
		);
	});
});