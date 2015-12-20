/*
	Switcher
*/

function Switcher( config ) {
	var
		$root = config.$root,
		$container = $root.next(),

		data = config.data,
		active = config.active || 0;

	init();

	function init() {
		renderSwitcher();
		bindEvents();
	}

	function renderSwitcher() {
		var html = "";

		for ( var i = 0, length = data.length; i < length; i++ ) {
			html += "<div class='switcher__item'>" + data[ i ].title + "</div>";
		}

		$root.append( $( "<div class='switcher'/>" ).html( html ) );
	}

	function setActive( id ) {
		active = id;
		$root.children().removeClass( "active" ).eq( id ).addClass( "active" );
		$container.children().hide().eq( id ).fadeIn();
	}

	function getActive() {
		return active;
	}

	function bindEvents() {
		$root.children().on( "click", function() {
			var id = $( this ).index();
			setActive( id );
		} );
	}

	// API
	return {
		setActive: setActive,
		getActive: getActive
	};
}