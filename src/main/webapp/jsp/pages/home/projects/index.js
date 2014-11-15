require(
	[ "jquery", "webstories", "jquery.ws.editor", "jquery.ws.alert"],
	function( $, webstories ) {
		"use strict";
		var feedback = $( "#action-alert" ).actionAlert();
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
				var id = $( "#meta" ).data( "story-id" );
				return feedback.actionAlert( "show", "Salvando..." )
					.then(function() {
						return webstories
							.api( "/api/stories/" + id + "/save", "PUT", {
								id: id,
								chapters: chapters
							}).fail(function( jqXHR ) {
								feedback.actionAlert( "ajaxError", jqXHR );
							}).done(function( json ) {
								feedback.actionAlert( "show", "A história foi salva com sucesso!" );
								feedback.actionAlert( "closeAfter", 3000 );
								resolve( json );
							});
					});
			},
			validatePublication: function( chapterId ) {
				var storyId = $( "#meta" ).data( "story-id" );
				feedback.actionAlert( "show", "Publicando..." );
				return webstories.api(
					"/api/stories/" + storyId + "/chapters/" + chapterId + "/validate",
					"POST"
				).done(function( validation ) {
					feedback.actionAlert( "ajaxValidation", validation );
					feedback.actionAlert( "closeAfter", 3000 );
				});
			}
		});
	}
);
