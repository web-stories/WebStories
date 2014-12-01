define([
	"angular",
	"js/editor/service/StoriesResource",
	"js/editor/service/ChaptersService",
	"js/editor/controller/ThumbsController",
	"angular.resource"
], function( angular, StoriesResource, ChaptersService, ThumbsController ) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "ChaptersService", ChaptersService )
		.controller( "ThumbsController", ThumbsController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
