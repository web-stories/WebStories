define(function() {
	"use strict";
	function EditorSavingQueue( $rootScope ) {
		var queue = [];
		
		this.save = function( argument ) {
			var items = Array.isArray( argument ) ? argument : [ argument ];
			queue = queue.concat( items );
			dequeue();
		};
		
		function dequeue() {
			var next = queue.shift();
			
			if ( !queue.length ) {
				next(function() {
					$rootScope.$broadcast( "editor:saved" );
				});
			} else {
				next( dequeue );
			}
		}
	}
	return [ "$rootScope", EditorSavingQueue ];
});
