define(function() {
	"use strict";
	function EditorSavingQueue( $rootScope ) {
		var queue = [];
		var started = false;
		
		this.queue = function( argument ) {
			var items = Array.isArray( argument ) ? argument : [ argument ];
			queue.push.apply( queue, items );
			if ( !started ) {
				start();
			}
		};
		
		function start() {
			started = true;
			dequeue();
		}
		
		function finish() {
			started = false;
			$rootScope.$broadcast( "editor:saved" );
		}
		
		function dequeue() {
			var executable = queue.shift();
			executable(function next() {
				if ( !queue.length ) {
					finish();
					return;
				}
				dequeue();
			});
		}
	}
	return [ "$rootScope", EditorSavingQueue ];
});
