require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		options: {
			chaptersOffset: 0,
			menuId: "",
			loadSection: function() {}
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
			var url = webstories.contextPath + "/components/editor-section";
			webstories.loadComponent( url, loaded );
		}
	});
});