;
( function( window, $ ) {

	init();

	function init() {
		createSlider();
		createCarousel();
		bindEvents();
	}

	function createSlider() {
		$( ".js-flexslider" ).flexslider( {
			animation: "slide"
		} );
	}

	function createCarousel() {

	}

	function bindEvents() {

	}

}( this, jQuery ) );