define([
	"angular",
	"js/story/service/StoryResource",
	"js/story/service/StoryStructure",
	"js/story/factory/SlidesModel",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/global/directive/AlertDirective",
	"js/global/filter/HTMLTrustedFilter",
	"angular.resource",
	"angular.jmpress"
], function(
	angular,
	StoryResource,
	StoryStructure,
	SlidesModel,
	PageController,
	StoryController,
	AlertDirective,
	HTMLTrustedFilter
) {
	"use strict";
	angular.module( "ws.story", [ "ngResource", "jmpress" ] )
		.service( "StoryResource", StoryResource )
		.service( "StoryStructure", StoryStructure )
		.factory( "SlidesModel", SlidesModel )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.directive( "wsAlert", AlertDirective )
		.filter( "htmlTrusted", HTMLTrustedFilter );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
