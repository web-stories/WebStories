require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		_create: function() {
			this._refresh();
			this._on( this.element, this._setupEvents );
			this._initComponents();
		},
		_refresh: function() {
			this._refreshDataStructure();
			this._refreshDOM();
		},
		_refreshDataStructure: function() {
			var create = {
				chapter: function( chapter, index ) {
					return {
						number: index + 1,
						id: chapter.id
					};
				}
			};
			this._chapters = $.map( this.element.find( ".editor-chapter" ), create.chapter );
		},
		_refreshDOM: function() {
			var refresh = {
				chapter: function( chapter ) {
					$( "#" + chapter.id )
						.find( ".editor-chapter-title-header" )
							.text( "Capítulo " + chapter.number );
				}
			};
			this._chapters.forEach( refresh.chapter );
		},
		_setupEvents: {
			"click a": function( event ) {
				var href = $( event.currentTarget ).attr( "href" );
				this._scrollTo( href );
				event.preventDefault();
			},
			"click .editor-chapter-thumb-add": function() {
				var nextChapter = this._chapters.length + 1;
				Promise.all([
					this._loadChapterThumb( nextChapter ),
					this._loadChapter( nextChapter )
				]).then($.proxy(function( values ) {
					var thumbnail = $( values[ 0 ] )
						.appendTo( this.element.find( ".editor-chapter-thumbs > ul" ) );
					$( values[ 1 ] )
						.appendTo( this.element.find( ".editor-chapters" ) );
					var href = thumbnail
						.find( ".editor-chapter-thumb" )
						.attr( "href" );
					this._refresh();
					this._scrollTo( href, function() {
						$( href )
							.find( ".editor-chapter-title-name" )
							.focus();
					});
				}, this ));
			},
			"click .editor-section-add": function( event ) {
				new Promise( this.options.loadSection )
					.then($.proxy(function( html ) {
						var previous = $( event.currentTarget )
							.parents( ".editor-chapter-section" );
						var section = $( html )
							.insertAfter( previous );
						this._refresh();
						this._scrollTo( section, 100, function() {
							section
								.find( ".editor-chapter-section-text" )
								.focus();
						});
					}, this ));
			},
			"click .editor-section-delete": function( event ) {
				var drop = {
					section: $.proxy(function( section ) {
						var content = section.find( ".editor-chapter-section-text" ).val().trim();
						var lastSection = section.siblings().length === 0;
						if ( lastSection ) {
							drop.chapter( section.parents( ".editor-chapter" ) );
							return;
						}
						if ( !content ) {
							section.remove();
							this._refresh();
						} else if ( confirm( "Esta seção será apagada!" ) ) {
							section.remove();
							this._refresh();
						}
					}, this ),
					chapter: $.proxy(function( chapter ) {
						if ( confirm( "O conteúdo deste capítulo será apagado!" ) ) {
							$( "#" + this.options.menuId + " > ul > li" )
								.eq( chapter.index() )
								.remove();
							chapter.remove();
							this._refresh();
						}
					}, this )
				};
				drop
					.section( $( event.currentTarget ).parents( ".editor-chapter-section" ) );
			}
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
		_initComponents: function() {
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
		_scrollTo: function( selector, offset, done ) {
			if ( $.isFunction( offset ) ) {
				done = offset;
				offset = undefined;
			}
			offset = offset || 0;
			$( "html, body" ).animate({
				scrollTop: $( selector ).offset().top - this.options.chaptersOffset - offset
			}, {
				duration: "fast",
				done: done
			});
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