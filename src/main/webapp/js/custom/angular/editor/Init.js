define([
	"angular", /* 0 */
	"js/editor/service/StoriesResource", /* 1 */
	"js/editor/service/ChaptersService", /* 2 */
	"js/editor/controller/StoryController", /* 3 */
	"js/editor/controller/MenuController", /* 4 */
	"js/editor/controller/EditableController", /* 5 */
	"angular.resource"
], function() {
	"use strict";
	
	var args = [].slice.call( arguments );
	var angular = args[ 0 ];
	var StoriesResource = args[ 1 ];
	var ChaptersService = args[ 2 ];
	var StoryController = args[ 3 ];
	var MenuController = args[ 4 ];
	var EditableController = args[ 5 ];
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "ChaptersService", ChaptersService )
		.controller( "StoryController", StoryController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
