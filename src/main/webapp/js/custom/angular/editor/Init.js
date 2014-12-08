define([
	"angular",
	"js/editor/service/EditorResource",
	"js/editor/service/EditorStructure",
	"js/editor/service/EditorContent",
	"js/editor/service/EditorSavingQueue",
	"js/editor/service/EditorSectionValidation",
	"js/editor/factory/EditorModel",
	"js/editor/factory/KeyEvent",
	"js/editor/controller/EditorController",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"js/editor/controller/ChapterController",
	"js/editor/controller/SectionController",
	"js/editor/directive/EditorMenuDirective",
	"js/editor/directive/EditorFocusDirective",
	"angular.resource",
	"angular.smoothscroll"
], function(
	angular,
	EditorResource,
	EditorStructure,
	EditorContent,
	EditorSavingQueue,
	EditorSectionValidation,
	EditorModel,
	KeyEvent,
	EditorController,
	MenuController,
	EditableController,
	ChapterController,
	SectionController,
	EditorMenuDirective,
	EditorFocusDirective
) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorStructure", EditorStructure )
		.service( "EditorContent", EditorContent )
		.service( "EditorSavingQueue", EditorSavingQueue )
		.service( "EditorSectionValidation", EditorSectionValidation )
		.factory( "EditorModel", EditorModel )
		.factory( "KeyEvent", KeyEvent )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController )
		.directive( "wsEditorMenu", EditorMenuDirective )
		.directive( "wsEditorFocus", EditorFocusDirective );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
