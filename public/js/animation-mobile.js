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
			case 'photo' :
				$('.title-block').html('<span>00.5 /</span> ФОТОЗВІТ / TURBO PARTY Зелений театр 05.07.2013');
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

	// feeback click
	$('.container-feedback').on('click tap', function(e){
		console.log( $('a[data-slide="feedback"]').parent().find('span') );
		$('a[data-slide="feedback"]').parent().find('span').trigger('tap');
	});
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
			if( $('#photo').is( '.now' ) ){
	            var title = '<span>00.5 / ФОТОЗВІТ /</span>' + ($('.putty').text()).replace(/\//g,'.');
	            $('.title-block').html(title);
            }
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
			// nav photo
			var liPhoto
			if( $('section.now').attr('id') === 'photo' ){

				$('.nav-photo').show();
	
				liPhoto = $('.nav-photo li');
				liPhoto.css({
					left : 0,
					width: 100
				});

				// show li
				// var left = maxWidth;
				// TweenMax.staggerTo(liPhoto,0.3,{
				// 	left:100,
				// 	onComplete: function(){
				// 		liPhoto.width(100)
				// 	}
				// },0.25);
			}
			else{
				var liPhoto = $('.nav-photo li');
				var left = liPhoto.width();
				TweenMax.staggerTo(liPhoto,0.3,{
					left: left + 20,
					onComplete : function(){
						$('.nav-photo').fadeOut();
					}
				},0.25);
			}

			// 
			if( $('section.now').attr('id') === 'site-hd' )
				$('.container-feedback').addClass('active');
			else
				$('.container-feedback').removeClass('active');
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

				var y = $this.offset().top

				container
					.animate({'scrollTop' : container.scrollTop() + y},1000);

				return false;
			}

		});

	}; 

	//  navigate site hover

	$('.nav-site')
		.on({
			mouseenter : function(e){
				if( $(this).find('li').width() != 67) return;

				var x = e.pageX;
				var li = $(this).find('li');
				if(x > 65) return;

				TweenMax.staggerTo(li, 0.3, {width:'247px'}, 0.25);	

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

	// navigatePhoto hover
	$('.nav-photo')
		.on({
			mouseenter : function(){
				var li = 
					$(this)
						.children('li');

				$(this).addClass('mouseenter');
				li.css('width', 'auto');
				TweenMax.staggerTo(li,0.3,{'left' : 0},0.25);

			},
			mouseleave : function(){
				$(this).removeClass('mouseenter');
				var li = 
					$(this)
						.children('li')

				var left = $(this).width() - 20;
				li.css({
					left : 0,
					width : 100
 				});

			}
		})

	$('section').on('tap', function(){
		if( $('.nav-site li').width() === 247 )
			$('.nav-site').trigger('mouseleave');

		if( $('.nav-photo li').css('width') === 'auto' )
			$('.nav-photo').trigger('mouseleave');

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

	$('.arrow-start').not('.canvasArrow').on({
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

	var question = $('.question-anaswer > div');
	var footer = $('.footer');
	var xv = $('.xv');
	var w = $(window);
	var img = $('.block-image img, .carousel img, #new_hd img, #newHD img').not('#photo img');
	function heightQuestion(){

		question.height( w.height() - ( footer.height() +  xv.height() + 50 ) )
		if( question.height() > 314 )
			question.height(314);
	}
	function sizePacks(){

		var maxHeight = w.height() - ( footer.height() +  xv.height() + 10 )
		img.css('max-height', maxHeight);
		// if( w.height() <= 480 )
		// $('#myCarousel').css('height', maxHeight);

	}
	heightQuestion();
	sizePacks();
	$( window ).on( 'orientationchange resize', function( event ) {

		if( !$('section.now').length ){

			$('section').each(function(){

				var position = $(this).offset().top

				if( position <= 10 && position >= -10 )
					$(this).addClass('now');

			});

		}

		var scroll = $('section.now').position().top;

		if( scroll !== 0 ){
			$('section.now').scrollTop( 0 );
			$('.container-fluid').scrollTop( $('.container-fluid').scrollTop() + scroll );
		}
		heightQuestion();
		sizePacks();
	});

})