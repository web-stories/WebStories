define([
	"angular",
	"js/editor/service/StoriesResource",
	"js/editor/service/ChaptersService",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"angular.resource"
], function( angular, StoriesResource, ChaptersService, MenuController, EditableController ) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "ChaptersService", ChaptersService )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
