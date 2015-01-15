define([
	"angular",
	"js/story/service/StoryResource",
	"js/story/service/StoryStructure",
	"js/story/service/SlidesManip",
	"js/story/service/StoryControls",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/story/controller/ControlsController",
	"js/global/directive/AlertDirective",
	"js/global/filter/HTMLTrustedFilter",
	"angular.resource",
	"angular.jmpress"
], function(
	angular,
	StoryResource,
	StoryStructure,
	SlidesManip,
	StoryControls,
	PageController,
	StoryController,
	ControlsController,
	AlertDirective,
	HTMLTrustedFilter
) {
	"use strict";
	angular.module( "ws.story", [ "ngResource", "jmpress" ] )
		.service( "StoryResource", StoryResource )
		.service( "StoryStructure", StoryStructure )
		.service( "SlidesManip", SlidesManip )
		.service( "StoryControls", StoryControls )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.controller( "ControlsController", ControlsController )
		.directive( "wsAlert", AlertDirective )
		.filter( "htmlTrusted", HTMLTrustedFilter );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
