/*!
 * Dynamic Textarea v0.0.2
 * https://github.com/web-stories/dynamic-textarea
 *
 * Copyright 2015 Web Stories
 * Released under the MIT license
 */
(function( init ) {
	if ( typeof define === "function" && define.amd ) {
		define(function() {
			return init();
		});
	} else {
		document.addEventListener( "DOMContentLoaded", init );
	}
}(function() {
	var originalHeight;
	function refresh( textarea ) {
		originalHeight = originalHeight || window.getComputedStyle( textarea ).height;
		textarea.style.overflow = "hidden";
		textarea.style.height = originalHeight;
		if ( textarea.scrollHeight > textarea.clientHeight ) {
			textarea.style.height = textarea.scrollHeight + "px";
		}
	};
	[ "keyup", "keydown" ].forEach(function( eventType ) {
		document.addEventListener( eventType, function( event ) {
			var element = event.target;
			if ( element.nodeName !== "TEXTAREA" ) {
				return;
			}
			if ( !element.dataset.hasOwnProperty( "dynamic" ) ) {
				return;
			}
			refresh( element );
		});
	});
	var api = {
		refresh: function() {
			var i = 0;
			var textareas = document.querySelectorAll( "[data-dynamic]" );
			for ( ; i < textareas.length; i += 1 ) {
				refresh( textareas[ i ] );
			}
		}
	};
	api.refresh();
	return api;
}));