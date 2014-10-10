(function() {
	var deps = [ "jquery", "webstories", "jquery.ws.editor", "jquery.ws.alert.saving"];
	require( deps, function( $, webstories ) {
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
			autosave: function( chapters ) {
				var feedback = $( "#saving-feedback" ).saving();
				var id = $( "#meta" ).data( "story-id" );
				return webstories
					.api( "/api/stories/" + id + "/save", "PUT", {
						id: id,
						chapters: chapters
					}).fail(function() {
						feedback.saving( "error" );
					}).done(function() {
						feedback.saving( "saved" );
					});
			}
		});
	});
}());