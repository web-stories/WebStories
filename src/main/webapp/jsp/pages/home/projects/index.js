require( ["jquery", "webstories", "jquery.ws.editor"], function( $, webstories ) {
	$( ".saving-close" ).click(function() {
		$( this )
			.parents( ".saving-alert" )
			.removeClass( "in" );
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
		},
		autosave: function( chapters ) {
			var alert = {
				saving: function() {
					$( ".saving-alert" )
						.addClass( "in" )
						.find( ".saving-text" )
							.html( "Salvando a história..." );
				},
				saved: function() {
					$( ".saving-alert" )
						.find( ".saving-text" )
							.html( "A história foi salva com sucesso!" );
					setTimeout(function() {
						$( ".saving-alert" )
							.removeClass( "in" );
					}, 3000 );
				},
				error: function() {
					var content = [
						"<b>Erro:</b> Não foi possível salvar",
						"O servidor foi reiniciado ou você está sem conexão com a internet",
						"<a href='javascript:location.reload()'>clique aqui para recarregar</a>"
					].join( "<br>" );
					$( ".saving-alert" )
						.find( ".saving-text" )
						.html( content );
				}
			};
			$.ajax({
				url: webstories.contextPath + "/home/projects/auto-save",
				type: "PUT",
				data: chapters,
				error: function() {
					alert.error();
				},
				beforeSend: function() {
					alert.saving();
				},
				success: function( response ) {
					console.log( chapters );
					alert.saved();
				}
			});
		}
	});
});