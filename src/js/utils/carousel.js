/*
	Carousel
*/

function Carousel( $root ) {
	var
		$items = $root.children(),

		itemW = $items.eq( 0 ).width(),
		auto = $root.data( "auto" ) || false,
		time = $root.data( "time" ) || 2000,
		speed = $root.data( "speed" ) || 500,
		direction = $root.data( "direction" ) || "to-left",
		navOffsetX = $root.data( "nav-offset-x" ) || 0,
		navOffsetY = $root.data( "nav-offset-y" ) || 0,

		prevBtnCSS = "width: 20px;" +
		"height: 20px;" +
		"background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACtElEQVRYR62XjVEVMRSF76lA6AArQCoQKhArECoQKxAqECoQK1ArECpQK1ArECq4zrdzs5ONm032LZl58xbeJufc/xPZiuXux2b2ysxemNlefHPCDzN7iO87SV97j1XrRXcH6K2ZXQRoawu/Q+bWzK4k8VxdiwTc/TLAIcHCsi9YKgmrx+XueIXPaXgpEbmWdFVjMEsgrP6WuZgDOGjRmgQS+/EYn2cRmpO5/f8RCEsAx+qfZnZWWtsTA95x94Pw2GGEBRITz00IBPNfAf5J0lkv2NJ77k4+vAkSz3NPjAQKt68CzxL1phamjAT5c5QI5wRIuPe4XRLJ1LUK4u8kXdc2ujvuJxxUB3g2EIhYfY+/j3tjXoCTL+ytJmrkFzi8M4QiEUgxGpm1zF8LnlVI8jThukgEYES57PeU2q7gmbdJ9AdJ+3J3GsdnmowknhfXFvDMCzQzWvprCCT3n0viuUUgbW7GfCEZKe+PZnYDgTsze2lmR63ky8juDB5hoMpIxnsIDKUhqTUXkqcezeygJ1cazcmHmeLuPNgSAXentpmIgHeXaQcB6yWQ4o63ZodKK3fK30fDe0IQmU+u0MU2k4jz/g5dtzcJn5JEKCsm7pCE3WX4VCTcHZ3wIZXhLo1oUziyoXSypRXvRCIGH634UdLe1mG0mkQW8skwQn79joHU7IiF9usmkVufmtmcIJkollZ9F4lZFSTFEJsKksyipFhuJZ23wAtPkNlV5ezu4xDLFdecKE2hWEViYfIRXiYf1fYHqT8rSjNrmFTENel5xvRESq/wDLIcrcGZgJ8uyvJKcvFvZFRV8c70eYARuEnWV8d3awQDnG434BBHPijn8mrGxZVZgat5ZjE9yYtBAc+t3stpfs3qiQDAtPjLlm5oEsjRYohgYbo3oKRYuDi/nuOlrvUPQl+y37vp6rYAAAAASUVORK5CYII=);" +
		"width: 32px;" +
		"height: 32px;" +
		"margin: " + ( ( navOffsetY !== 0 ) ? navOffsetY - 16 : -16 ) + "px 0 0 0;" +
		"position: absolute;" +
		"top: 50%;" +
		"left: 20px;" +
		"z-index: 100;" +
		"cursor: pointer;",

		nextBtnCSS = "width: 20px;" +
		"height: 20px;" +
		"background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2ElEQVRYR62XjVEUQRCF+0UgZIARCBEIEQgRCBGIESgRqBGIEQgRyEWAF4EagRJBW9/aszU77s7McnQVdXvsTffr178jWyHufmpmL83s0Mz24hMN383sT3zeSNr0qlXrh+6OoXdmdh5GW0d4D5iPZvZJEs+LsgggDL8xs8vM8K2Z3eCpJLwexd1hhT9YehUvBiCSrpYQzAII499C4UN4g6KqN8lInAc4zKUQncyd/w9AeIJxqCeW55J+9vBe/iZ0XZvZiwgLICbMTQAE8h9h/Isk4r6ThE7y4XWAeJ4zMQIoaF80nuVGM8GKHIEJQJA/R+ldDuB9xGwj6XjJbXcnth+i5GbjWjkL/YTjShL2bADg7gdmdh/fD2sxDwbuQhEKu0FETmCHZB5CkQAkekZktcDvCCIxTQgvEwAQPTOz/ZWltpqJAP8bFiTtK9rrVzO7lUQT6ZaSiTy5GgzSzGhWZwBI9F9I4nmVFCCuJV20FLg75f15aNXuDo0MmKOySbQUFZ0vhaMJIkvGDQCG0pDUHEwNWqkkdJFLPSB86AnuzoPtCiDKmWEEE4AYsrzSE/7ZfWIAzI80xKpJPdp9whDkxrdmdlwr6QCwzZOQjgZ9q6WYIz3GCRUdcUjCVIZvJTG1Vsla45ErkzKk+dCIqkNoDtVjjAeA1IhOylbMgOhaPnYwTrmyczxI2iuHUdcS8ljj4T1hZtecDCMyGM+p3yoLOxpPyceeeTCO40CWxmR1xmcLSTPb87wpgE8Xkqynp41lsZVmG2/3lhwOpmrbSoKJQeaW0hQKDlCaXat4peUSXlY4Su8Xq/7sUpqxkPdzGDnrrYwSREw9xi46MX5aXcsXxiv/hg3i1luilFq6znF+MV+qI9jdSUwmGtWB0EBo16zWkwtoeMvGS2NLm9Vwq0ob8FyYmjtAJB1AiGEC0mrX3de5JoCilPCMO0O6nuMxktggZ6igyfWrhvYvbHiw3zg7nyUAAAAASUVORK5CYII=);" +
		"width: 32px;" +
		"height: 32px;" +
		"margin: " + ( ( navOffsetY !== 0 ) ? navOffsetY - 16 : -16 ) + "px 0 0 0;" +
		"position: absolute;" +
		"top: 50%;" +
		"right: 20px;" +
		"z-index: 100;" +
		"cursor: pointer;",

		$container = $( "<div style='width: 9999px;'/>" ),
		$navPrevBtn = $( "<div class='carousel__nav-prev' style='" + prevBtnCSS + "'/>" ),
		$navNextBtn = $( "<div class='carousel__nav-next' style='" + nextBtnCSS + "'/>" );

	// Public
	function init() {
		createSkeleton();
		bindEvents();
	}

	// Private
	function createSkeleton() {
		$root.css( {
			"width": "100%",
			"overflow": "hidden",
			"position": "relative"
		} ).html( $container.append( $items ) ).append( $navPrevBtn, $navNextBtn );
	}

	function movePrev() {
		$container.prepend( $items.last().css( {
			"marginLeft": -itemW
		} ) );
		$items = $container.children();
		$items.eq( 0 ).animate( {
			"marginLeft": 0
		}, speed );
	}

	function moveNext() {
		$items.eq( 0 ).animate( {
			"marginLeft": -itemW
		}, speed, function() {
			$container.append( $( this ).css( {
				"marginLeft": 0
			} ) );
			$items = $container.children();
		} );
	}

	function bindEvents() {
		$navPrevBtn.on( "click", movePrev );
		$navNextBtn.on( "click", moveNext );

		if ( auto ) {
			setInterval( function() {
				switch ( direction ) {
					case "to-right":
						$navNextBtn.click();
						break;
					case "to-left":
						$navPrevBtn.click();
						break;
				}
			}, time );
		}
	}

	return {
		init: init
	};
}