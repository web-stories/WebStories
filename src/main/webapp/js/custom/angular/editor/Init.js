define([
	"angular", /* 0 */
	"js/editor/service/StoriesResource", /* 1 */
	"js/editor/service/EditorService", /* 2 */
	"js/editor/controller/EditorController", /* 3 */
	"js/editor/controller/MenuController", /* 4 */
	"js/editor/controller/EditableController", /* 5 */
	"angular.resource"
], function() {
	"use strict";
	
	var args = [].slice.call( arguments );
	var angular = args[ 0 ];
	var StoriesResource = args[ 1 ];
	var EditorService = args[ 2 ];
	var EditorController = args[ 3 ];
	var MenuController = args[ 4 ];
	var EditableController = args[ 5 ];
	
	angular.module( "ws.editor", [ "ngResource" ] )
		.service( "StoriesResource", StoriesResource )
		.service( "EditorService", EditorService )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
