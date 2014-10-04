require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		options: {
			chaptersOffset: 0,
			menuId: "",
			loadSection: function() {},
			loadChapterThumb: function() {}
		},
		_create: function() {
			this._cacheElements();
			this._setupEvents();
			this._setupComponents();
		},
		_cacheElements: function() {
			this._chapters = this.element.find( ".editor-chapter" );
			this._menu = this.element.find( ".editor-chapter-thumbs" );
		},
		_setupEvents: function() {
			this._on( this._menu, {
				"click a": function( event ) {
					var chapterId = $( event.currentTarget ).attr( "href" );
					event.preventDefault();
					this._switchChapter( chapterId );
				},
				"click .editor-chapter-thumb-add": function( event ) {
					var container = $( event.currentTarget ).parents( ".editor-chapter-thumbs" );
					var nextChapter = container.find( "> ul > li" ).length + 1;
					this._loadChapterThumb( nextChapter ).then(function( html ) {
						container.find( "> ul" ).append( html );
					});
				}
			});
			this._on( this._chapters, {
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
		loadChapterThumb: function( chapter, loaded ) {
			var uri = webstories.contextPath + "/components/editor-chapter-thumb";
			var query = "chapter=" + chapter;
			webstories.loadComponent( uri + "?" + query, loaded );
		}
	});
});