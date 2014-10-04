require( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	$.widget( "ws.editor", {
		options: {
			chaptersOffset: 0
		},
		_create: function() {
			this._cacheElements();
			this._setupEvents();
			this._setupComponents();
		},
		_cacheElements: function() {
			this._chapters = this.element.find( ".editor-chapter-thumbs" );
		},
		_setupEvents: function() {
			this._on( this._chapters, {
				"click a": function( event ) {
					var chapterId = $( event.currentTarget ).attr( "href" );
					event.preventDefault();
					this._switchChapter( chapterId );
				}
			});
		},
		_setupComponents: function() {
			this._chapters.affix({
				offset: {
					top: this._chapters.offset().top - this.options.chaptersOffset
				}
			});
			$( "body" ).scrollspy({
				target: "#" + this.options.menuId,
				offset: this.options.chaptersOffset + 1
			});
		},
		_switchChapter: function( chapterId ) {
			$( "html, body" ).animate({
				scrollTop: $( chapterId ).offset().top - this.options.chaptersOffset
			}, "fast" );
		}
	});
	$( ".editor" ).editor({
		chaptersOffset: $( ".header-navbar" ).outerHeight( true ),
		menuId: "chapter-menu"
	});
});