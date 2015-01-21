/*
 * active.js
 * Set the active classes on steps
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	var $jmpress = $.jmpress,

		/* DEFINES */
		activeClass = "activeClass",
		nestedActiveClass = "nestedActiveClass",

		/* DEFAULTS */
		defaults = $jmpress( "defaults" );

	defaults[ nestedActiveClass ] = "nested-active";
	defaults[ activeClass ] = "active";

	/* HOOKS */
	$jmpress( "setInactive", function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[ activeClass ],
			nestedActiveClassSettings = settings[ nestedActiveClass ];
		if ( activeClassSetting ) {
			$( step ).removeClass( activeClassSetting );
		}
		if ( nestedActiveClassSettings ) {
			$.each( eventData.parents, function( idx, element ) {
				$( element ).removeClass( nestedActiveClassSettings );
			});
		}
	});

	$jmpress( "setActive", function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[ activeClass ],
			nestedActiveClassSettings = settings[ nestedActiveClass ];
		if ( activeClassSetting ) {
			$( step ).addClass( activeClassSetting );
		}
		if ( nestedActiveClassSettings ) {
			$.each( eventData.parents, function( idx, element ) {
				$( element ).addClass( nestedActiveClassSettings );
			});
		}
	});

}));
