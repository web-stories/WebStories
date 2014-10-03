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
			scrollTop: $( chapterId ).offset().top - offset,
			duration: 100,
			easing: "linear"
		});
	}
	$( "body" ).scrollspy({
		target: thumbsNav
	});
	$( thumbsNav ).find( "a" )
		.click( click );
});