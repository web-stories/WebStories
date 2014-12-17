define([
	"angular",
	"js/story/controller/PageController",
	"js/global/directive/AlertDirective"
], function(
	angular,
	PageController,
	AlertDirective
) {
	"use strict";
	angular.module( "ws.story", [] )
		.controller( "PageController", PageController )
		.directive( "wsAlert", AlertDirective );
	return angular.bootstrap( document.body, [ "ws.story" ] );
});
