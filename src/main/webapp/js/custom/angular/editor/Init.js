define([
	"angular", /* 0 */
	"js/editor/service/EditorResource", /* 1 */
	"js/editor/service/EditorService", /* 2 */
	"js/editor/controller/EditorController", /* 3 */
	"js/editor/controller/MenuController", /* 4 */
	"js/editor/controller/EditableController", /* 5 */
	"js/editor/controller/ChapterController", /* 6 */
	"js/editor/controller/SectionController", /* 7 */
	"angular.resource",
	"angular.smoothscroll"
], function() {
	"use strict";
	
	var args = [].slice.call( arguments );
	var angular = args[ 0 ];
	var EditorResource = args[ 1 ];
	var EditorService = args[ 2 ];
	var EditorController = args[ 3 ];
	var MenuController = args[ 4 ];
	var EditableController = args[ 5 ];
	var ChapterController = args[ 6 ];
	var SectionController = args[ 7 ];
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorService", EditorService )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
