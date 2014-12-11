define(function() {
	"use strict";
	
	function TrustedFilter( $sce ) {
		return function( url ) {
			return $sce.trustAsResourceUrl( url );
		};
	}
	
	return [ "$sce", TrustedFilter ];
});
