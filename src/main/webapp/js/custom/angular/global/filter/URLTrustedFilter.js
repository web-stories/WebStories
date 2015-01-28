define(function() {
	"use strict";
	
	function URLTrustedFilter( $sce ) {
		return function( url ) {
			return $sce.trustAsResourceUrl( url );
		};
	}
	
	return [ "$sce", URLTrustedFilter ];
});
