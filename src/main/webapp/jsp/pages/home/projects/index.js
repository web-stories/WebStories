require( ["jquery", "webstories", "jquery.ws.editor"], function( $, webstories ) {
	$( ".editor" ).editor({
		chaptersOffset: $( ".header-navbar" ).outerHeight( true ),
		menuId: "chapter-menu",
		loadSection: function( loaded ) {
			var uri = webstories.contextPath + "/components/editor-section";
			webstories.loadComponent( uri, loaded );
		},
		loadChapter: function( nextChapter, loaded ) {
			var uri = webstories.contextPath + "/components/editor-chapter";
			webstories.loadComponent( uri, {
				chapter: nextChapter
			}, loaded );
		},
		loadChapterThumb: function( nextChapter, loaded ) {
			var uri = webstories.contextPath + "/components/editor-chapter-thumb";
			webstories.loadComponent( uri, {
				chapter: nextChapter
			}, loaded );
		}
	});
});