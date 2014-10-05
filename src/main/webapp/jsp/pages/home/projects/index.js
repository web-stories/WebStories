require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		_create: function() {
			this._setupEvents();
			this._setupComponents();
		},
		_setupEvents: function() {
			this._on( this.element, {
				"click a": function( event ) {
					var href = $( event.currentTarget ).attr( "href" );
					event.preventDefault();
					this._switchChapter( href );
				},
				"click .editor-chapter-thumb-add": function( event ) {
					var lis = this.element.find( ".editor-chapter-thumbs > ul > li" );
					var nextChapter = lis.length + 1;
					Promise.all([
						this._loadChapterThumb( nextChapter ),
						this._loadChapter( nextChapter )
					]).then($.proxy(function( values ) {
						var href = $( values[ 0 ] ).find( ".editor-chapter-thumb" ).attr( "href" );
						this.element.find( ".editor-chapter-thumbs > ul" )
							.append( values[ 0 ] );
						this.element.find( ".editor-chapters" )
							.append( values[ 1 ] );
						this._switchChapter( href );
					}, this ));
				}
			});
			this._on( this.element, {
				"click .editor-section-add": function( event ) {
					this._loadSection().then(function( html ) {
						$( event.currentTarget )
							.parents( ".editor-chapter" )
							.find( ".editor-chapter-sections" )
								.append( html );
					});
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
		_loadSection: function() {
			var loader = this.options.loadSection;
			return new Promise(function( resolve ) {
				loader( resolve );
			});
		},
		_setupComponents: function() {
			var menu = this.element.find( ".editor-chapter-thumbs" );
			menu.affix({
				offset: {
					top: menu.offset().top - this.options.chaptersOffset
				}
			});
			$( "body" ).scrollspy({
				target: "#" + this.options.menuId,
				offset: this.options.chaptersOffset + 150
			});
		},
		_switchChapter: function( href ) {
			$( "html, body" ).animate({
				scrollTop: $( href ).offset().top - this.options.chaptersOffset
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