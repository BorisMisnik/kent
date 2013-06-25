var action = function () {

	var that = {};
	var container = $('.container-fluid');


	that.scrollTop = function(){

		if( $('#main').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() - container.height();
		var scroll = yScrol > 0 ? yScrol : 0;
		
		container.animate({'scrollTop' : scroll},1000);

		this.scroll = scroll;
		this.top = true;
		this.bottom = false;
		this.selectAnimation();


	};
	
	that.scrollBotom = function(){
		
		if( $('#photo').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() + container.height();
		container.animate({'scrollTop' : yScrol},1000);

		this.scroll = yScrol;
		this.top = false;
		this.bottom = true;
		this.selectAnimation();

	};
	that.selectAnimation = function(){

		if( this.top && $('.now').prev() ) {

			$('.now')
				.removeClass('now')
				.prev()
				.addClass('now');
			if( !$('.now').is( ':visible' ) ){
				$('.now')
						.removeClass('now')
						.prev()
						.addClass('now');
			}

		}
		else if( this.bottom && $('.now').next() ) {

			$('.now')
				.removeClass('now')
				.next()
				.addClass('now');

			if( !$('.now').is( ':visible' ) ){
				$('.now')
					.removeClass('now')
					.next()
					.addClass('now')

			}
		}

		$('section.now').scrollTop( 0 );
		this.titlePage();

	};
	that.titlePage = function(){

		var slide = $('section.now').data('slide');

		switch (slide) {
			case 'sigarets' : 
				$('.title-block').html('<span>00.1 /</span> СИГАРЕТИ KENT');
				break;
			case 'history' :
				$('.title-block').html('<span>00.2 /</span> Історія КЕНТ');
				break;
			case 'question' :
				$('.title-block').html('<span>00.3 /</span> Запитання та відповіді');
				break;
			case 'profile' : 
				$('.title-block').html('<span>00.4 /</span> Профайл');
				break;
			default :
				$('.title-block').html('');
		}

	};

	return that;
};

$(document).ready(function(){

	var animation = action();
	var container = $('.container-fluid');
	$.event.special.swipe.verticalDistanceThreshold = 35;
	$.event.special.swipe.handleSwipe = function( start, stop ) {
		var element = $( start.origin[0] );

		if ( stop.time - start.time < $.event.special.swipe.durationThreshold && 
			!element.is( 'p' ) &&  !element.is( 'span' ) 
			&& !element.is( 'h3' ) && !element.is( 'button' ) && !element.is( 'img' )
			&& !element.is('.block-text') && !element.is('.sigaret') && !element.is('.text-wrapper') 
			&& !element.is( '.no-sweep' ) ) {

		    start.origin
			  .trigger('swipe')
		      .trigger( start.coords[1] > stop.coords[ 1 ] ? "swipeup" : "swipedwon" )

	  	}
	}
	$('.container-fluid').on({
		swipedwon : function(){
			animation.scrollBotom();
			
		},
		swipeup : function(){
			animation.scrollTop();
		
		},
		swipe : function(){

		}
	})
	var t,l = new Date().getTime();
	container.on({
		
		scroll : function(){

			$this = $(this);
			var now = new Date().getTime();
			if(now - l > 500){
				$this.trigger('scrollStart');
				l = now;
			}

			clearTimeout(t);
			t = setTimeout(function(){
				$this.trigger('scrollEnd')
			},300);

		},	

		scrollStart : function(){

		},

		scrollEnd : function(){

			// console.log('Scroll end');
			var name = $('.now').data('slide');
			$('.nav-site a')
				.each(function(){

					if($(this).data('slide') === name){

						$('li.active').removeClass('active');
						$(this).parent().addClass('active');

						return;
					}

				});
		}

	});

	$('.carousel')
		.find('img')
		.on({
			tap : function(){
				clickboxe( $(this).data('name') );
			}
		});

	function clickboxe(name){

		$('.container-fluid section')
			.each(function(){
			$this = $(this);
			var dataname = $this.data('name');
			
			if(dataname === name){

				$('section.now').removeClass('now');
				$this.addClass('now');

				var y = $this.offset().top - 28;

				container
					.animate({'scrollTop' : container.scrollTop() + y},1000);

				return false;
			}

		});

	}; 

	//  navigate site hover

	$('.nav-site')
		.on({
			mousemove : function(e){
	
				if( $(this).find('li').width() != 67) return;

				var x = e.pageX;
				var li = $(this).find('li');

				if(x > 65) return;

				TweenMax.staggerTo(li, 0.3, {width:'237px'}, 0.25);	

			},
			mouseleave : function(){

				var li = $(this).find('li');

				TweenMax.staggerTo(li, 0.3, {
					width:'67px'
				}, 0.25);

			}
		});


	// navigate site click
	$('.nav-site')
		.find('span')
		.on({
			tap : function(e){

				e.preventDefault();

				$a = $(this).parent().find('a');
				var slide = $a.data('slide');
				container
					.children('section')
					.each(function(){

						var nameSlide = $(this).data('slide');

						if(slide === nameSlide){

							$('section.now').removeClass('now');
							$(this).addClass('now');

							var y = $(this).offset().top;
							var animationName = $(this).data('animation');

							container
								.animate({'scrollTop' : container.scrollTop() + y},1000);

							animation.titlePage();

							return false;
						}

					});
			}
		});



	$('.scrollButton')
		.find('a')
		.on({
			tap : function(e){

				e.preventDefault();

				$this  = $(this);

				if($this.is('.prev')){
					animation.scrollTop();
				}
				else{
					animation.scrollBotom();
				}
			}	
		});

	$('.arrow-start').on({
		tap : function(){
			animation.scrollBotom();
		}
	})


	$('section button')
		.on({
			tap : function(e){
				e.preventDefault();
				$this = $(this);

				var filter = 
					$this
						.parents('section')
						.find('.aboutFilter');

				var text = 
					$this
						.parents('section')
						.find('.infoF');

					if($this.is('.moreDetail')){

						text.hide();
						filter.show();

					}
					else{

						text.show();
						filter.hide();

					}

			}
		});

	$( window ).on( "orientationchange", function( event ) {
		var scroll = $('section.now').position().top;
		if( scroll !== 0 ){
			$('section.now').scrollTop( 0 );
			$('.container-fluid').scrollTop( $('.container-fluid').scrollTop() + scroll );
		}
			
	});

})