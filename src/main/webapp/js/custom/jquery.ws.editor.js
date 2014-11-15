define( ["jquery", "jquery.ui.widget", "bootstrap"], function( $ ) {
	"use strict";
	$.widget( "ws.editor", {
		_ajaxQueue: $({}),
		_keyEvent: function( event ) {
			var typedCode = event.keyCode;
			var keyCodes = {
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
				F1: 112,
				F2: 113,
				F3: 114,
				F4: 115,
				F5: 116,
				F6: 117,
				F7: 118,
				F8: 119,
				F9: 120,
				F10: 121,
				F11: 122,
				F12: 123,
				HOME: 36,
				MENU_KEY: 93,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				SHIFT: 16,
				TAB: 9,
				V: 86,
				WINDOWS_KEY: 91,
				X: 88
			};
			return {
				// Returns if this key event is supposed to add one or more characters in a text
				// field
				isCharacter: function() {
					var i = 0;
					var valid = true;
					var invalidCharacters = [
						keyCodes.ALT,
						keyCodes.ARROW_DOWN,
						keyCodes.ARROW_LEFT,
						keyCodes.ARROW_RIGHT,
						keyCodes.ARROW_UP,
						keyCodes.BACKSPACE,
						keyCodes.CONTROL,
						keyCodes.DELETE,
						keyCodes.END,
						keyCodes.ESC,
						keyCodes.F1,
						keyCodes.F2,
						keyCodes.F3,
						keyCodes.F4,
						keyCodes.F5,
						keyCodes.F6,
						keyCodes.F7,
						keyCodes.F8,
						keyCodes.F9,
						keyCodes.F10,
						keyCodes.F11,
						keyCodes.F12,
						keyCodes.HOME,
						keyCodes.MENU_KEY,
						keyCodes.PAGE_DOWN,
						keyCodes.PAGE_UP,
						keyCodes.SHIFT,
						keyCodes.TAB,
						keyCodes.WINDOWS_KEY
					];
					
					// Check if character is invalid
					for ( ; i < invalidCharacters.length; i += 1 ) {
						if ( invalidCharacters[ i ] === typedCode ) {
							valid = false;
						}
					}
					
					// Invalidate any character if ctrl is pressed, ctrl means a command
					if ( event.ctrlKey ) {
						valid = false;
					}
					
					// But if the command is ctrl + v, then user is pasting content and it is a
					// character related command
					if ( event.ctrlKey && typedCode === keyCodes.V ) {
						valid = true;
					}
					
					return valid;
				},
				// Returns if this key event is supposed to manipulate existing characters in a text
				// field
				isTextManip: function() {
					var i = 0;
					var isCharacter = this.isCharacter();
					var manipKeys = [
						keyCodes.BACKSPACE,
						keyCodes.DELETE
					];
					
					if ( isCharacter ) {
						return true;
					}
					
					for ( ; i < manipKeys.length; i += 1 ) {
						if ( manipKeys[ i ] === typedCode ) {
							return true;
						}
					}
					
					// If user cut a content, then he is manipulating text
					if ( event.ctrlKey && typedCode === keyCodes.X ) {
						return true;
					}
					
					return false;
				}
			};
		},
		_create: function() {
			this._refresh();
			this._on( this.element, this._clickEvents.call( this ) );
			this._on( this.element, this._textEvents.call( this ) );
			this._validate();
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
						published: $( chapter ).data( "published" ) || false,
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
						.find( ".editor-chapter-title-header-number" )
							.text( chapter.position );
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
				events[ "keydown " + selector ] = this._textHandlers.keydown;
				events[ "keyup " + selector ] = this._textHandlers.keyup;
				events[ "blur " + selector ] = this._textHandlers.blur;
			}.bind( this ));
			
			return events;
		},
		_textHandlers: {
			keydown: function( event ) {
				var section = this._section( event.currentTarget );
				var keyEvent = this._keyEvent( event );
				
				if ( keyEvent.isTextManip() ) {
					if ( section.validLength() ) {
						section.markValid();
						this._edited = true;
					} else {
						section.markInvalid();
						return keyEvent.isCharacter() ? false : true;
					}
				}
			},
			keyup: function( event ) {
				var section = this._section( event.currentTarget );
				
				// Check validity after the key was pressed
				if ( section.validLength() ) {
					section.markValid();
					this._edited = true;
				} else {
					section.markInvalid();
				}
				
				if ( section.remainingPercent() < 50 ) {
					section.showRemaining();
				} else {
					section.hideRemaining();
				}
			},
			blur: function() {
				this._refresh();
				this._save();
			}
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
				},
				"click .editor-chapter-thumb-publish": function( event ) {
					var saveStory = new Promise( this._save.bind( this ) );
					var validatePublication = new Promise(function( resolve, reject ) {
						var chapterIndex = $( event.currentTarget )
							.parents( ".editor-chapter-thumbs-item" )
							.index();
						var chapterId = this._chapters[ chapterIndex ].id;
						this.options.validatePublication( chapterId )
							.done( resolve );
					}.bind( this ));
					var publish = function( resolve ) {
						$( event.currentTarget )
							.parents( "form" )
							.submit();
					};
					saveStory
						//.then( validatePublication )
						.then( publish );
				}
			};
		},
		_validate: function() {
			this.element
				.find( ".editor-chapter-section-text" )
				.each(function( index, textarea ) {
					var section = this._section( textarea );
					
					if ( section.validLength() ) {
						section.markValid();
					} else {
						section.markInvalid();
					}
					
					if ( section.remainingChars() <= 0 ) {
						section.showRemaining();
					} else {
						section.hideRemaining();
					}
					
				}.bind( this ));
		},
		_section: function( textarea ) {
			var limitChars = 660;
			var sectionElement = $( textarea ).parents( ".editor-chapter-section" );
			var messageElement = sectionElement.find( ".editor-section-footer-msg" );
			return {
				markValid: function() {
					sectionElement.removeClass( "has-warning" );
				},
				markInvalid: function() {
					sectionElement.addClass( "has-warning" );
				},
				showRemaining: function() {
					var message;
					var remainingChars = this.remainingChars();
					
					if ( remainingChars < 0 ) {
						message = "Ultrapassado o limite da seção.";
					} else {
						message = remainingChars + " caractere(s) restante(s).";
					}
					
					messageElement.text( message );
				},
				hideRemaining: function() {
					messageElement.empty();
				},
				validLength: function() {
					return this.remainingChars() > 0;
				},
				remainingChars: function() {
					var char;
					var i = 0;
					var count = 0;
					var text = textarea.value;
					for ( ; i < text.length; i += 1 ) {
						char = text.charAt( i );
						if ( char === "\n" ) {
							count += 55;
						} else {
							count += 1;
						}
					}
					return limitChars - count;
				},
				remainingPercent: function() {
					var current = this.remainingChars();
					return current * 100 / limitChars;
				}
			};
		},
		_save: function( resolve ) {
			var execute;
			
			if ( this._edited ) {
				// Queuing ensures that concurrent calls will be executed in the proper sequence
				execute = (function( chapters ) {
					return function( next ) {
						var updateIds = this._updateIds.bind( this );
						var deferred = this.options.save( chapters, updateIds )
							.always( next );
						if ( resolve ) {
							deferred
								.always( resolve );
						}
					}.bind( this );
				}.call( this, this._chapters ));
				this._ajaxQueue.queue( execute );
				this._edited = false;
			} else if ( resolve ) {
				resolve();
			}
			
			clearTimeout( this._saveTimeout );
			this._saveTimeout = this._delay( this._save, 60000 );
		},
		_updateIds: function( story ) {
			$.each( story.chapters, function( index, chapter ) {
				$( ".editor-chapter" )
					.eq( index )
					.attr( "data-chapter-id", chapter.id );
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
			// Menu should hold its width after pulled out from the DOM with affix
			menu.width( menu.width() );
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
