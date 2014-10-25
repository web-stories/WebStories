define( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	"use strict";
	$.widget( "ws.editor", {
		_ajaxQueue: $({}),
		_key: function( event ) {
			var keyCode = event.keyCode;
			var invalidCharacters = {
				ALT: 18,
				ARROW_DOWN: 40,
				ARROW_LEFT: 37,
				ARROW_RIGHT: 39,
				ARROW_UP: 38,
				BACKSPACE: 8,
				CONTROL: 17,
				DELETE: 46,
				END: 35,
				ESC: 27,
				HOME: 36,
				MENU_KEY: 93,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				SHIFT: 16,
				TAB: 9,
				WINDOWS_KEY: 91
			};
			return {
				isCharacter: function() {
					var key;
					var valid = true;
					
					// Check if character is invalid
					for ( key in invalidCharacters ) {
						if ( !invalidCharacters.hasOwnProperty( key ) ) {
							continue;
						}
						if ( invalidCharacters[ key ] === keyCode ) {
							valid = false;
						}
					}
					
					// Invalidate any character if ctrl is pressed, ctrl means a command
					if ( valid && event.ctrlKey ) {
						valid = false;
					}
					
					return valid;
				}
			};
		},
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
						id: $( chapter ).data( "chapter-id" ),
						title: titleInput.val().trim(),
						position: index + 1,
						sections: $.map( sections, create.section )
					};
				},
				section: function( section, index ) {
					var textInput = $( section ).find( ".editor-chapter-section-text" );
					return {
						id: $( section ).data( "sectionId" ),
						position: index + 1,
						text: textInput.val().trim()
					};
				}
			};
			this._chapters = $.map( this.element.find( ".editor-chapter" ), create.chapter );
		},
		_refreshDOM: function() {
			var refresh = {
				chapter: function( chapter, index ) {
					$( ".editor-chapter" )
						.eq( index )
						.find( ".editor-chapter-title-header" )
							.text( "Capítulo " + chapter.position );
				}
			};
			this._chapters.forEach( refresh.chapter );
		},
		_textEvents: function() {
			var events = {};
			$.each([
				".editor-chapter-section-text",
				".editor-chapter-title-name"
			], function( index, selector ) {
				events[ "keydown " + selector ] = this._type.down;
				events[ "keyup " + selector ] = this._type.up;
				events[ "blur " + selector ] = this._blur;
			}.bind( this ));
			return events;
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
					]).then(function( values ) {
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
					}.bind( this ));
				},
				"click .editor-section-add": function( event ) {
					new Promise( this.options.loadSection )
						.then(function( html ) {
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
						}.bind( this ));
				},
				"click .editor-section-delete": function( event ) {
					var drop = {
						section: function( section ) {
							var textInput = section.find( ".editor-chapter-section-text" );
							var content = $( textInput ).val().trim();
							var lastSection = section.siblings().length === 0;
							if ( lastSection ) {
								drop.chapter( section.parents( ".editor-chapter" ) );
								return;
							}
							if ( !content || confirm( "Esta seção será apagada!" ) ) {
								section.remove();
								this._refresh();
								this._edited = true;
							}
						}.bind( this ),
						chapter: function( chapter ) {
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
								this._edited = true;
								this._scrollTo( prevChapter );
							}
						}.bind( this )
					};
					drop
						.section( $( event.currentTarget ).parents( ".editor-chapter-section" ) );
				}
			};
		},
		_section: function( textarea ) {
			return {
				markValid: function() {
					$( textarea )
						.parents( ".editor-chapter-section" )
						.removeClass( "has-error" );
				},
				markInvalid: function() {
					$( textarea )
						.parents( ".editor-chapter-section" )
						.addClass( "has-error" );
				},
				validLength: function() {
					var char;
					var i = 0;
					var count = 0;
					var text = textarea.value.trim();
					for ( ; i < text.length; i += 1 ) {
						char = text.charAt( i );
						if ( char === "\n" ) {
							count += 55;
						} else {
							count += 1;
						}
					}
					return count <= 660;
				}
			};
		},
		_type: {
			down: function( event ) {
				var section = this._section( event.currentTarget );
				var key = this._key( event );
				
				// Character related behavior
				if ( key.isCharacter() ) {
					// Just mark to save in the next auto saving attempt
					this._edited = true;
					// Disable further editing if limit has reached
					if ( !section.validLength() ) {
						section.markInvalid();
						return false;
					}
				}
			},
			up: function( event ) {
				var section = this._section( event.currentTarget );
				if ( section.validLength() ) {
					section.markValid();
				}
			}
		},
		_blur: function() {
			this._refresh();
			this._save();
		},
		_save: function() {
			var execute;
			
			if ( this._edited ) {
				// Queuing ensures that concurrent calls will be executed in the proper sequence
				execute = (function( chapters ) {
					var autosave = this.options.autosave;
					var resolved = this._updateIds.bind( this );
					return function( next ) {
						autosave( chapters, resolved )
							.always( next );
					};
				}.call( this, this._chapters ));
				this._ajaxQueue.queue( execute );
				this._edited = false;
			}
			
			clearTimeout( this._saveTimeout );
			this._saveTimeout = this._delay( this._save, 60000 );
		},
		_updateIds: function( story ) {
			$.each( story.chapters, function( index, chapter ) {
				$( ".editor-chapter" )
					.eq( index )
					.attr( "chapter-id", chapter.id );
			}.bind( this ));
			this._refresh();
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
