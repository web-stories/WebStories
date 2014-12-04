define(function() {
	"use strict";
	function EditorSavingQueue( $rootScope ) {
		var queue = [];
		
		this.save = function( savingAction ) {
			queue.push( savingAction );
			dequeue();
		};
		
		function next() {
			return queue.shift();
		}
		
		function dequeue() {
			if ( !queue.length ) {
				$rootScope.$broadcast( "editor:saved" );
				return;
			}
			next()( next );
		}
	}
	return [ "$rootScope", EditorSavingQueue ];
});
