require(
	[ "jquery", "webstories", "jquery.ws.editor", "jquery.ws.alert.saving"],
	function( $, webstories ) {
		"use strict";
		$( ".editor" ).editor({
			chaptersOffset: $( ".header-navbar" ).outerHeight( true ),
			menuId: "chapter-menu",
			loadSection: function( loaded ) {
				webstories.loadComponent( "/components/editor-section", loaded );
			},
			loadChapter: function( nextChapter, loaded ) {
				webstories.loadComponent( "/components/editor-chapter", {
					chapter: nextChapter
				}, loaded );
			},
			loadChapterThumb: function( nextChapter, loaded ) {
				webstories.loadComponent( "/components/editor-chapter-thumb", {
					chapter: nextChapter
				}, loaded );
			},
			save: function( chapters, resolve ) {
				var feedback = $( "#saving-feedback" ).saving();
				var id = $( "#meta" ).data( "story-id" );
				return webstories
					.api( "/api/stories/" + id + "/save", "PUT", {
						id: id,
						chapters: chapters
					}).fail(function( jqXHR ) {
						feedback.saving( "error", jqXHR );
					}).done(function( json ) {
						feedback.saving( "saved" );
						console.log( json );
						resolve( json );
					});
			},
			validatePublication: function( chapterId ) {
				var storyId = $( "#meta" ).data( "story-id" );
				return webstories.api(
					"/api/stories/" + storyId + "/chapters/" + chapterId + "/validate",
					"POST"
				);
			}
		});
	}
);
