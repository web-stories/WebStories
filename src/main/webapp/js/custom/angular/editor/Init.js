define([
	"angular",
	"js/editor/service/StoriesResource",
	"js/editor/service/ChaptersService",
	"js/editor/controller/MenuController",
	"angular.resource"
], function( angular, StoriesResource, ChaptersService, MenuController ) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "ChaptersService", ChaptersService )
		.controller( "MenuController", MenuController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
