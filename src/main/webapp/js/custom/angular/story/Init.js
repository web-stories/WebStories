define([
	"angular",
	"js/story/controller/PageController",
	"js/story/controller/StoryController",
	"js/global/directive/AlertDirective"
], function(
	angular,
	PageController,
	StoryController,
	AlertDirective
) {
	"use strict";
	angular.module( "ws.story", [] )
		.controller( "PageController", PageController )
		.controller( "StoryController", StoryController )
		.directive( "wsAlert", AlertDirective );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
