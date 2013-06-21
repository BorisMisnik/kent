var action = function () {

	var that = {};
	var container = $('.container-fluid');



	that.scrollTop = function(){

		if( $('#main').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() - container.height();
		var scroll = yScrol > 0 ? yScrol : 0;

		container.animate({'scrollTop' : scroll},1000);

		this.top = true;
		this.bottom = false;
		this.selectAnimation();

	};
	
	that.scrollBotom = function(){
		
		if( $('#photo').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() + container.height();

		container.animate({'scrollTop' : yScrol},1000);

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

		}
		else if( this.bottom && $('.now').next() ) {

			$('.now')
				.removeClass('now')
				.next()
				.addClass('now');
		}
		
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

	var t,l = new Date().getTime();

	container.hammer().on({
		swipeup : function(){
			console.log( 'top' );
			animation.scrollTop();
		},
		swipedown: function(){
			animation.scrollBotom();	
		}
	});

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
	
	function clickboxe(name){

		$('.container-fluid section')
			.each(function(){
			$this = $(this);
			var dataname = $this.data('name');
			
			if(dataname === name){

				$('section.now').removeClass('now');
				$this.addClass('now');

				var y = $this.offset().top;

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
		.find('li')
		.on({
			click : function(e){

				e.preventDefault();

				$a = $(this).find('a');
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

	$('.carousel')
		.find('.wrapeer')
		.on({
			click : function(){
				clickboxe( $(this).data('name') );
			}
		});

	$('.scrollButton')
		.find('a')
		.on({
			click : function(e){

				e.preventDefault();

				$this  = $(this);

				if($this.is('.prev')){
					animation.scrolTop();
				}
				else{
					animation.scrollBotom();
				}
			}	
		});

	$('.arrow-start').on({
		click : function(){
			animation.scrollBotom();
		}
	})


	$('.hdi')
		.find('.submit')
		.on({
			click : function(){
				if($(this).is('.moreDetail')){

					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');
						
					$('.hdiShort').css('visibility','hidden');
					filter.show();

					var left  = -$('.hdiShort').width();
					var right = -filter.width()/2;
					TweenMax.to( $('.hdiShort'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );

				}
				else{

					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');

					$('.hdiShort').css('visibility','visible');
					filter.hide();

					var left  = 0;
					var right = -3000;
					TweenMax.to( $('.hdiShort'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );

				}
				animation.siteHdi();
			}
		});

	$('#site-hds')
		.find('.submit')
		.on({
			click : function(){

				if($(this).is('.moreDetail')){

					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');

					$('.hdsifno').css('visibility','hidden');
					filter.show();

					var left  = -$('.hdsifno').width();
					var right = -filter.width()/2;

					TweenMax.to( $('.hdsifno'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );

				}
				else{
					
					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');
					
					$('.hdsifno').css('visibility','visible');
					filter.hide();

					var left  = 0;
					var right = -3000;
					TweenMax.to( $('.hdsifno'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );

				}
				
				animation.hds();
			}
		});

	$('#site-nanotek')
		.find('.submit')
		.on({
			click : function(){

				if($(this).is('.moreDetail')){

					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');

					$('.infoNanotek').css('visibility','hidden');
					filter.show();

					var left  = -$('.infoNanotek').width();
					var right = -filter.width()/2;

					TweenMax.to( $('.infoNanotek'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );

				}
				else{
					
					var filter = 
						$(this)
							.parents('section')
							.find('.aboutFilter');
					
					$('.infoNanotek').css('visibility','visible');
					filter.hide();

					var left  = 0;
					var right = -3000;

					TweenMax.to( $('.infoNanotek'),1,{ left:left } );
					TweenMax.to( filter,1,{ marginRight:right } );
				}
				
				animation.nanotek();
			}
		});


	



	$(window).on({
		resize : function(){

			if($('.hdiShort').css('visibility') === 'hidden'){

				var right = -$('.aboutFilter').width()/2;
				$('.aboutFilter').css('margin-right',right);

				var left = -$('.hdiShort').width();
				$('.hdiShort').css('left' , left);

			}
			else if( $('.hdsifno').css('visibility') === 'hidden' ){

				var right = -$('.aboutFilter').width()/2;
				$('.aboutFilter').css('margin-right',right);

				var left = -$('.hdsifno').width();
				$('.hdsifno').css('left' , left);

			}
			else if( $('.infoNanotek').css('visibility') === 'hidden' ){

				var right = -$('.aboutFilter').width()/2;
				$('.aboutFilter').css('margin-right',right);

				var left = -$('.infoNanotek').width();
				$('.infoNanotek').css('left' , left);

			}	


			$('.container-fluid').css({
				'height' : function(){

					var size = $('.xv').height() + $('.fotter').height();
					return $('body').height() - size;

				}
			});
			

		}
	});

	$('.container-fluid').css({
		'height' : function(){

			var size = $('.xv').height() + $('.fotter').height();
			return $('body').height() - size;

		}
	});

})