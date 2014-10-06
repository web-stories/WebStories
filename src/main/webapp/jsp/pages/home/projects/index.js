require( ["jquery", "webstories", "jquery.ui.widget", "bootstrap"], function( $, webstories ) {
	$.widget( "ws.editor", {
		_create: function() {
			this._refresh();
			this._setupEvents();
			this._setupComponents();
		},
		_refresh: function() {
			this._refreshDataStructure();
			this._refreshDOM();
		},
		_refreshDataStructure: function() {
			var finder = function( number ) {
				return this.find(function( object ) {
					return object.number === number;
				});
			};
			var create = {
				chapter: function( chapter, index ) {
					var sections = $( chapter ).find( ".editor-chapter-section" );
					return {
						number: index + 1,
						id: chapter.id,
						sections: $.map( sections, create.section )
					};
				},
				section: function( section, index ) {
					return {
						number: index + 1
					};
				}
			};
			this._chapters = $.map( this.element.find( ".editor-chapter" ), create.chapter );
			this._chapters.get = finder;
			this._chapters.forEach(function( chapter ) {
				chapter.sections.get = finder;
			});
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
		_setupEvents: function() {
			this._on( this.element, {
				"click a": function( event ) {
					var href = $( event.currentTarget ).attr( "href" );
					event.preventDefault();
					this._scrollTo( href );
				},
				"click .editor-chapter-thumb-add": function( event ) {
					var nextChapter = this._chapters.length + 1;
					Promise.all([
						this._loadChapterThumb( nextChapter ),
						this._loadChapter( nextChapter )
					]).then($.proxy(function( values ) {
						var href = $( values[ 0 ] ).find( ".editor-chapter-thumb" ).attr( "href" );
						this.element.find( ".editor-chapter-thumbs > ul" )
							.append( values[ 0 ] );
						this.element.find( ".editor-chapters" )
							.append( values[ 1 ] );
						this._refresh();
						this._scrollTo( href );
						$( href ).find( ".editor-chapter-title-name" )
							.focus();
					}, this ));
				}
			});
			this._on( this.element, {
				"click .editor-section-add": function( event ) {
					var previous = $( event.currentTarget ).parents( ".editor-chapter-section" );
					this._loadSection()
						.then($.proxy(function( html ) {
							var section = $( html ).insertAfter( previous );
							this._refresh();
							this._scrollTo( section, 100, function() {
								section.find( ".editor-chapter-section-text" )
									.focus();
							});
						}, this ));
				},
				"click .editor-section-delete": function( event ) {
					var section = $( event.currentTarget ).parents( ".editor-chapter-section" );
					this._dropSection( section );
				}
			});
		},
		_dropSection: function( section ) {
			var content = section.find( ".editor-chapter-section-text" ).val().trim();
			var lastSection = section.siblings().length === 0;
			if ( lastSection ) {
				this._dropChapter( section.parents( ".editor-chapter" ) );
				return;
			}
			if ( !content ) {
				section.remove();
			} else if ( confirm( "Esta seção será apagada!" ) ) {
				section.remove();
			}
			this._refresh();
		},
		_dropChapter: function( chapter ) {
			var number = chapter.index() + 1;
			if ( confirm( "O conteúdo deste capítulo será apagado!" ) ) {
				chapter.remove();
				this._refresh();
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
		_loadSection: function() {
			return new Promise( this.options.loadSection );
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
		_scrollTo: function( selector, offset, done ) {
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