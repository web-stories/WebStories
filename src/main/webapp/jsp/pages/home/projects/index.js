require( ["jquery", "bootstrap"], function( $ ) {
	var offset = $( ".header-navbar" ).outerHeight( true );
	var thumbsNav = ".editor-chapter-thumbs";
	function click( event ) {
		var chapterId = $( this ).attr( "href" );
		event.preventDefault();
		jumpTo( chapterId );
	}
	function jumpTo( chapterId ) {
		$( "html, body" ).animate({
			scrollTop: $( chapterId ).offset().top - offset
		}, "fast" );
	}
	$( "body" ).scrollspy({
		target: thumbsNav,
		offset: offset + 1
	});
	$( thumbsNav ).find( "a" )
		.click( click );
});

require( ["jquery", "bootstrap"], function( $ ) {
	$( ".editor-chapter-thumbs" ).affix({
		offset: {
			top: 168
		}
	});
});