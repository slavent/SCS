;
( function( window, $ ) {
	var
		$window = $( window ),
		$header = $( "header" ),
		$nav = $( "nav" ),
		$requestBtn = $( ".js-request-btn" ),
		$rootColors = $( ".js-colors" ),
		$rootIcheck = $( "input[type=checkbox]" ),
		$rootSelectize = $( ".js-select" ),

		scrollTopPos = $header.outerHeight() + $nav.outerHeight();

	initUI();

	function initUI() {
		createCarousel();
		createCustomCheckbox();
		createCustomSelect();
		createColors();
		bindEvents();
	}

	function createCarousel() {
		var
			carouselNewGoods = Carousel( $( ".js-carousel-new-goods" ) ),
			carouselClients = Carousel( $( ".js-carousel-clients" ) );

		carouselNewGoods.init();
		carouselClients.init();
	}

	function createCustomCheckbox() {
		$rootIcheck.iCheck( {
			checkboxClass: "icheckbox_minimal-aero",
			radioClass: "iradio_minimal-aero",
			increaseArea: "20%"
		} );
	}

	function createCustomSelect() {
		$rootSelectize.selectize();
	}

	function createColors() {
		$rootColors.children().each( function() {
			var
				color = $( this ).data( "color" ),
				$colorItem = $( "<div style='background:" + color + "; width: 20px; height: 20px;'/>" )

			$( this ).append( $colorItem );
		} );
	}

	function sendOrder() {

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