define([
	"angular",
	"js/editor/service/EditorResource",
	"js/editor/service/EditorStructure",
	"js/editor/service/EditorContent",
	"js/editor/service/EditorSavingQueue",
	"js/editor/controller/EditorController",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"js/editor/controller/ChapterController",
	"js/editor/controller/SectionController",
	"js/editor/value/EditorModel",
	"angular.resource",
	"angular.smoothscroll"
], function(
	angular,
	EditorResource,
	EditorStructure,
	EditorContent,
	EditorSavingQueue,
	EditorController,
	MenuController,
	EditableController,
	ChapterController,
	SectionController,
	EditorModel
) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorStructure", EditorStructure )
		.service( "EditorContent", EditorContent )
		.service( "EditorSavingQueue", EditorSavingQueue )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController )
		.value( "EditorModel", EditorModel );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
