define([
	"angular",
	"js/story/service/StoryResource",
	"js/story/service/StoryStructure",
	"js/story/service/SlidesManip",
	"js/story/service/SlidesBehavior",
	"js/story/service/ControlsManip",
	"js/story/service/StoryControls",
	"js/story/service/StoryPersistence",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/story/controller/ControlsController",
	"js/story/controller/SlidesController",
	"js/story/controller/ChapterEndingController",
	"js/global/directive/AlertDirective",
	"js/global/directive/BootstrapModal",
	"js/global/filter/HTMLTrustedFilter",
	"angular.cookies",
	"angular.resource",
	"angular.jmpress"
], function(
	angular,
	StoryResource,
	StoryStructure,
	SlidesManip,
	SlidesBehavior,
	ControlsManip,
	StoryControls,
	StoryPersistence,
	PageController,
	StoryController,
	ControlsController,
	SlidesController,
	ChapterEndingController,
	AlertDirective,
	BootstrapModal,
	HTMLTrustedFilter
) {
	"use strict";
	angular.module( "ws.story", [ "ngResource", "ngCookies", "jmpress" ] )
		.service( "StoryResource", StoryResource )
		.service( "StoryStructure", StoryStructure )
		.service( "SlidesManip", SlidesManip )
		.service( "SlidesBehavior", SlidesBehavior )
		.service( "ControlsManip", ControlsManip )
		.service( "StoryControls", StoryControls )
		.service( "StoryPersistence", StoryPersistence )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.controller( "ControlsController", ControlsController )
		.controller( "SlidesController", SlidesController )
		.controller( "ChapterEndingController", ChapterEndingController )
		.directive( "wsAlert", AlertDirective )
		.directive( "bsModal", BootstrapModal )
		.filter( "htmlTrusted", HTMLTrustedFilter );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
