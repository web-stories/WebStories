define([
	"angular",
	"js/editor/service/StoriesResource",
	"js/editor/service/ThumbsService",
	"js/editor/controller/ThumbsController",
	"angular.resource"
], function( angular, StoriesResource, ThumbsService, ThumbsController ) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "ThumbsService", ThumbsService )
		.controller( "ThumbsController", ThumbsController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
