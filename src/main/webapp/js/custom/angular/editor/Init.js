define([
	"angular",
	"js/editor/service/EditorResource",
	"js/editor/service/EditorStructure",
	"js/editor/service/EditorContent",
	"js/editor/service/EditorSavingQueue",
	"js/editor/service/EditorSectionValidation",
	"js/editor/service/EditorAlert",
	"js/editor/factory/EditorModel",
	"js/editor/factory/KeyEvent",
	"js/editor/controller/PageController",
	"js/editor/controller/EditorController",
	"js/editor/controller/MenuController",
	"js/editor/controller/EditableController",
	"js/editor/controller/ChapterController",
	"js/editor/controller/SectionController",
	"js/editor/directive/EditorMenuDirective",
	"js/editor/directive/EditorFocusDirective",
	"js/global/directive/AlertDirective",
	"angular.resource",
	"angular.smoothscroll"
], function(
	angular,
	EditorResource,
	EditorStructure,
	EditorContent,
	EditorSavingQueue,
	EditorSectionValidation,
	EditorAlert,
	EditorModel,
	KeyEvent,
	PageController,
	EditorController,
	MenuController,
	EditableController,
	ChapterController,
	SectionController,
	EditorMenuDirective,
	EditorFocusDirective,
	AlertDirective
) {
	"use strict";
	
	angular.module( "ws.editor", [ "ngResource", "smoothScroll" ] )
		.service( "EditorResource", EditorResource )
		.service( "EditorStructure", EditorStructure )
		.service( "EditorContent", EditorContent )
		.service( "EditorSavingQueue", EditorSavingQueue )
		.service( "EditorSectionValidation", EditorSectionValidation )
		.service( "EditorAlert", EditorAlert )
		.factory( "EditorModel", EditorModel )
		.factory( "KeyEvent", KeyEvent )
		.controller( "PageController", PageController )
		.controller( "EditorController", EditorController )
		.controller( "MenuController", MenuController )
		.controller( "EditableController", EditableController )
		.controller( "ChapterController", ChapterController )
		.controller( "SectionController", SectionController )
		.directive( "wsEditorMenu", EditorMenuDirective )
		.directive( "wsEditorFocus", EditorFocusDirective )
		.directive( "wsAlert", AlertDirective );
		
	angular.bootstrap( document.body, [ "ws.editor" ] );
});
