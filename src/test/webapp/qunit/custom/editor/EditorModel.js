QUnit.config.autostart = false;

module( "EditorModel" );
require([
	"angular",
	"js/editor/value/EditorModel"
], function( angular, EditorModel ) {
	start();
	
	module( "EditorModel" );
	
	test( "should update the sections position", function() {
		var modelEditor = {
			chapters: [{
				sections: [{
					position: 1
				}, {
					position: 3
				}]
			}]
		};
		var serverEditor = {
			chapters: [{
				sections: [{
					position: 1
				}, {
					position: 2
				}]
			}]
		};
		new EditorModel( modelEditor )
			.refreshDataStructure( serverEditor );
		strictEqual( modelEditor.chapters[ 0 ].sections[ 1 ].position, 2 );
	});
	
	test( "should update the chapters position", function() {
		var modelEditor = {
			chapters: [{
				position: 1,
				sections: []
			}, {
				position: 3,
				sections: []
			}]
		};
		var serverEditor = {
			chapters: [{
				position: 1,
				sections: []
			}, {
				position: 2,
				sections: []
			}]
		};
		new EditorModel( modelEditor )
			.refreshDataStructure( serverEditor );
		strictEqual( modelEditor.chapters[ 1 ].position, 2 );
	});
	
	test( "should create a new section if the model doesn't have it", function() {
		var modelEditor = {
			chapters: [{
				sections: [{
					id: 170,
					position: 1
				}, {
					id: 171,
					position: 2
				}]
			}]
		};
		var serverEditor = {
			chapters: [{
				sections: [{
					id: 170,
					position: 1
				}, {
					id: 172, // This was added later
					position: 2
				}, {
					id: 171,
					position: 3
				}]
			}]
		};
		new EditorModel( modelEditor )
			.refreshDataStructure( serverEditor );
		strictEqual( modelEditor.chapters[ 0 ].sections[ 1 ].id, 172 );
	});
	
	test( "should refresh the chapter publishable state", function() {
		var modelEditor = {
			chapters: [{
				publishable: false,
				sections: []
			}]
		};
		var serverEditor = {
			chapters: [{
				publishable: true,
				sections: []
			}]
		};
		new EditorModel( modelEditor )
			.refreshDataStructure( serverEditor );
		strictEqual( modelEditor.chapters[ 0 ].publishable, true );
	});
	
	test( "should create a new section at the top of the array", function() {
		var modelEditor = {
			chapters: [{
				sections: []
			}]
		};
		var serverEditor = {
			chapters: [{
				sections: [{
					id: 310
				}]
			}]
		};
		new EditorModel( modelEditor )
			.refreshDataStructure( serverEditor );
		deepEqual( modelEditor.chapters[ 0 ].sections[ 0 ], {
			id: 310
		});
	});
});