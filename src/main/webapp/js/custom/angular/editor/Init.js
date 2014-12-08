define([
	"angular",
	"js/editor/service/EditorResource",
	"js/editor/service/EditorStructure",
	"js/editor/service/EditorContent",
	"js/editor/service/EditorSavingQueue",
	"js/editor/factory/EditorModel",
	"js/editor/controller/EditorController",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"js/editor/controller/ChapterController",
	"js/editor/controller/SectionController",
	"js/editor/directive/EditorMenuDirective",
	"angular.resource",
	"angular.smoothscroll"
], function(
	angular,
	EditorResource,
	EditorStructure,
	EditorContent,
	EditorSavingQueue,
	EditorModel,
	EditorController,
	MenuController,
	EditableController,
	ChapterController,
	SectionController,
	EditorMenuDirective
) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorStructure", EditorStructure )
		.service( "EditorContent", EditorContent )
		.service( "EditorSavingQueue", EditorSavingQueue )
		.factory( "EditorModel", EditorModel )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController )
		.directive( "wsEditorMenu", EditorMenuDirective );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
