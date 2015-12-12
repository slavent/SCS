;
( function( window, $ ) {
	var
		$window = $( window ),
		$header = $( "header" ),
		$nav = $( "nav" ),

		scrollTopPos = $header.outerHeight() + $nav.outerHeight();

	init();

	function init() {
		createCarousel();
		bindEvents();
	}

	function createCarousel() {

	}

	function fixedNav() {
		console.log( "fix" );
		$nav.addClass( "fixed" );
	}

	function unfixedNav() {
		console.log( "unfix" );
		$nav.removeClass( "fixed" );
	}

	function bindEvents() {
		$window.on( "scroll", function() {
			console.log( $window.scrollTop(), scrollTopPos );
			if ( $window.scrollTop() > scrollTopPos ) {
				fixedNav();
			} else {
				unfixedNav();
			}
		} )
	}

}( this, jQuery ) );