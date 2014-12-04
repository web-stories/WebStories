define([
	"angular",
	"js/editor/service/EditorResource",
	"js/editor/service/EditorService",
	"js/editor/service/EditorSavingQueue",
	"js/editor/controller/EditorController",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"js/editor/controller/ChapterController",
	"js/editor/controller/SectionController",
	"angular.resource",
	"angular.smoothscroll"
], function(
	angular,
	EditorResource,
	EditorService,
	EditorSavingQueue,
	EditorController,
	MenuController,
	EditableController,
	ChapterController,
	SectionController
) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorService", EditorService )
		.service( "EditorSavingQueue", EditorSavingQueue )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
