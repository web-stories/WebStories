require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		options: {
			chaptersOffset: 0,
			menuId: "",
			loadSection: function() {},
			loadChapter: function() {},
			loadChapterThumb: function() {}
		},
		_create: function() {
			this._cacheElements();
			this._setupEvents();
			this._setupComponents();
		},
		_cacheElements: function() {
			this._menu = this.element.find( ".editor-chapter-thumbs" );
		},
		_setupEvents: function() {
			this._on( this.element, {
				"click a": function( event ) {
					var chapterId = $( event.currentTarget ).attr( "href" );
					event.preventDefault();
					this._switchChapter( chapterId );
				},
				"click .editor-chapter-thumb-add": function( event ) {
					var container = $( event.currentTarget ).parents( ".editor" );
					var chaptersParent = container.find( ".editor-chapters" );
					var thumbsParent = container.find( ".editor-chapter-thumbs > ul" );
					var nextChapter = thumbsParent.find( "> li" ).length + 1;
					var appendThumb = $.proxy(function( html ) {
						thumbsParent.append( html );
						return this._loadChapter( nextChapter );
					}, this );
					var appendChapter = function( html ) {
						chaptersParent.append( html );
					};
					this._loadChapterThumb( nextChapter )
						.then( appendThumb )
						.then( appendChapter );
				}
			});
			this._on( this.element, {
				"click .editor-section-add": function( event ) {
					function loaded( html ) {
						$( event.currentTarget )
							.parents( ".editor-chapter" )
							.find( ".editor-chapter-sections" )
								.append( html );
					}
					this.options.loadSection( loaded );
				}
			});
		},
		_loadChapterThumb: function( nextChapter ) {
			var loader = this.options.loadChapterThumb;
			return new Promise(function( resolve ) {
				loader( nextChapter, resolve );
			});
		},
		_loadChapter: function( nextChapter ) {
			var loader = this.options.loadChapter;
			return new Promise(function( resolve ) {
				loader( nextChapter, resolve );
			});
		},
		_setupComponents: function() {
			this._menu.affix({
				offset: {
					top: this._menu.offset().top - this.options.chaptersOffset
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
		menuId: "chapter-menu",
		loadSection: function( loaded ) {
			var uri = webstories.contextPath + "/components/editor-section";
			webstories.loadComponent( uri, loaded );
		},
		loadChapter: function( nextChapter, loaded ) {
			var uri = webstories.contextPath + "/components/editor-chapter";
			var query = "chapter=" + nextChapter;
			webstories.loadComponent( uri + "?" + query, loaded );
		},
		loadChapterThumb: function( nextChapter, loaded ) {
			var uri = webstories.contextPath + "/components/editor-chapter-thumb";
			var query = "chapter=" + nextChapter;
			webstories.loadComponent( uri + "?" + query, loaded );
		}
	});
});