define([
	"angular",
	"js/story/service/StoryResource",
	"js/story/service/SlidesStructure",
	"js/story/service/SlidesManip",
	"js/story/service/SlidesBehavior",
	"js/story/service/ControlsManip",
	"js/story/service/StoryControls",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/story/controller/ControlsController",
	"js/story/controller/SlidesController",
	"js/story/controller/ModalsController",
	"js/global/directive/AlertDirective",
	"js/global/directive/BootstrapModal",
	"js/global/filter/HTMLTrustedFilter",
	"angular.resource",
	"angular.jmpress"
], function(
	angular,
	StoryResource,
	SlidesStructure,
	SlidesManip,
	SlidesBehavior,
	ControlsManip,
	StoryControls,
	PageController,
	StoryController,
	ControlsController,
	SlidesController,
	ModalsController,
	AlertDirective,
	BootstrapModal,
	HTMLTrustedFilter
) {
	"use strict";
	angular.module( "ws.story", [ "ngResource", "jmpress" ] )
		.service( "StoryResource", StoryResource )
		.service( "SlidesStructure", SlidesStructure )
		.service( "SlidesManip", SlidesManip )
		.service( "SlidesBehavior", SlidesBehavior )
		.service( "ControlsManip", ControlsManip )
		.service( "StoryControls", StoryControls )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.controller( "ControlsController", ControlsController )
		.controller( "SlidesController", SlidesController )
		.controller( "ModalsController", ModalsController )
		.directive( "wsAlert", AlertDirective )
		.directive( "bsModal", BootstrapModal )
		.filter( "htmlTrusted", HTMLTrustedFilter );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
