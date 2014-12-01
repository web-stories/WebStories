define([ "angular", "angular.resource" ], function( angular ) {
	"use strict";
	angular.module( "ws.editor", [ "ngResource" ] );
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
