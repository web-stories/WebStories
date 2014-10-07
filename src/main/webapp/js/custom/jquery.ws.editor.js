define( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	$.widget( "ws.editor", {
		_create: function() {
			this._refresh();
			this._on( this.element, this._clickEvents.call( this ) );
			this._on( this.element, this._textEvents.call( this ) );
			this._initComponents();
			this._save();
		},
		_refresh: function() {
			this._refreshDataStructure();
			this._refreshDOM();
		},
		_refreshDataStructure: function() {
			var create = {
				chapter: function( chapter, index ) {
					var titleInput = $( chapter ).find( ".editor-chapter-title-name" );
					var sections = $( chapter ).find( ".editor-chapter-section" );
					return {
						name: titleInput.val().trim(),
						number: index + 1,
						id: chapter.id,
						sections: $.map( sections, create.section )
					};
				},
				section: function( section, index ) {
					var textInput = $( section ).find( ".editor-chapter-section-text" );
					return {
						text: textInput.val().trim()
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
		_textEvents: function() {
			return {
				"keyup .editor-chapter-section-text": this._type,
				"keyup .editor-chapter-title-name": this._type,
				"blur .editor-chapter-section-text": this._blur,
				"blur .editor-chapter-title-name": this._blur
			};
		},
		_clickEvents: function() {
			return {
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
							var prevChapter = chapter.prev();
							var lastChapter =
								this._chapters.length === 1 &&
								this._chapters[ 0 ].sections.length === 1;
							if ( lastChapter ) {
								alert( "Este capítulo não pode ser apagado!" );
								return;
							}
							if ( confirm( "O conteúdo deste capítulo será apagado!" ) ) {
								$( "#" + this.options.menuId + " > ul > li" )
									.eq( chapter.index() )
									.remove();
								chapter.remove();
								this._refresh();
								this._scrollTo( prevChapter );
							}
						}, this )
					};
					drop
						.section( $( event.currentTarget ).parents( ".editor-chapter-section" ) );
				}
			}
		},
		_type: function( event ) {
			var keys = [
				09, // Tab
				91, // Win
				18, // Alt
				16, // Shift
				17, // Ctrl
				27, // Esc
				33, // Pg up
				34, // Pg down
				93  // Context menu
			];
			keys.contains = function( current ) {
				return this.find(function( keyCode ) {
					return keyCode === current;
				});
			};
			this._edited = !keys.contains( event.keyCode );
		},
		_blur: function() {
			this._refresh();
			this._save();
		},
		_save: function() {
			if ( this._edited ) {
				this.options.autosave( this._chapters );
				delete this._edited;
			}
			clearTimeout( this._saveTimeout );
			this._saveTimeout = this._delay( this._save, 60000 );
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
});