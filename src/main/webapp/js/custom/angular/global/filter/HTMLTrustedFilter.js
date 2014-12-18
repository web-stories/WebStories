define(function() {
	"use strict";
	
	function HTMLTrustedFilter( $sce ) {
		return $sce.trustAsHtml;
	}
	
	return [ "$sce", HTMLTrustedFilter ];
});
