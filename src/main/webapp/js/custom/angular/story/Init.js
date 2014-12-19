define([
	"angular",
	"js/story/service/StoryResource",
	"js/story/service/StoryStructure",
	"js/story/factory/SlidesModel",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/story/controller/PresentationController",
	"js/global/directive/AlertDirective",
	"js/global/directive/ImpressDirective",
	"js/global/filter/HTMLTrustedFilter",
	"angular.resource"
], function(
	angular,
	StoryResource,
	StoryStructure,
	SlidesModel,
	PageController,
	StoryController,
	PresentationController,
	AlertDirective,
	ImpressDirective,
	HTMLTrustedFilter
) {
	"use strict";
	angular.module( "ws.story", [ "ngResource" ] )
		.service( "StoryResource", StoryResource )
		.service( "StoryStructure", StoryStructure )
		.factory( "SlidesModel", SlidesModel )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.controller( "PresentationController", PresentationController )
		.directive( "wsAlert", AlertDirective )
		.directive( "impress", ImpressDirective )
		.filter( "htmlTrusted", HTMLTrustedFilter );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
