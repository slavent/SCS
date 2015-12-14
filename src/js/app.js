;
( function( window, $ ) {
	var
		$window = $( window ),
		$header = $( "header" ),
		$nav = $( "nav" ),
		$requestBtn = $( ".js-request-btn" );

	scrollTopPos = $header.outerHeight() + $nav.outerHeight();

	init();

	function init() {
		createCarousel();
		bindEvents();
	}

	function createCarousel() {
		var
			carouselNewGoods = Carousel( $( ".js-carousel-new-goods" ) ),
			carouselClients = Carousel( $( ".js-carousel-clients" ) );

		carouselNewGoods.init();
		carouselClients.init();
	}

	function bindEvents() {
		$window.on( "scroll", function() {
			$window.scrollTop() > scrollTopPos ? $nav.addClass( "fixed" ) : $nav.removeClass( "fixed" );
		} );

		$requestBtn.magnificPopup( {
			type: "inline",
			mainClass: "mfp-fade"
		} );
	}

}( this, jQuery ) );