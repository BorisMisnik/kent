var action = function () {

	var that = {};
	var container = $('.container-fluid');
	var lines  = background();
	lines.init()
	     .line();
		

	that.arrow = function(){

		var tweenArrwo = new TimelineLite();
		TweenMax.to($('.arrow-start'), .6, {top:"-5px",
                       repeat:-1, yoyo:true});

		return that;	
	};

	that.boxes = function(){
		var div = $('.wrapeer');
		var counter = 0;
		div.css({ 'top' : function(){
			return div.parents('section').height()  + div.height();
		} })
		TweenMax.staggerTo( div, 0.6, {
			top:184.5
		}, 0.2);	
	};

	that.siteHdi = function(){

		var div = $('.block-image > div');
		var text = $('#site-hdi .block-text').find('*');

		div.css({ 'top' : function(){
			return div.parents('section').height();
		} });
		text.css({ 'left' : function(){
			return div.parents('section').width();
		} });


		TweenMax.staggerTo(div, 0.7, {
			top : 0,
			delay : 0.2
		}, 0.25);	
		TweenMax.staggerTo(text, 0.7, {
			left : 0,
			ease:Circ.easeOut
		}, 0.2);
		this.filter();
	};

	that.filter = function(){

		$('.sigaret').css('bottom','-382px');

		TweenMax.to($('.sigaret'), 1, {bottom:'41px'});

	};

	that.siteHd = function(){

		var div = $('.wrapper-box > div');
		var text = $('.boxesHD h3, .boxesHD p');

		div.css({'top' : function(){
			return -( div.parents('section').height() + div.height() )
		} });	

		text.css({'bottom' : function(){
			return -( text.parents('section').height() + text.height() )
		} });	

		TweenMax.staggerTo(div,0.7, {
			top:0,
			delay : 0.2,
			ease:Circ.easeOut
		}, 0.25);	

		TweenMax.staggerTo(text, 0.7, {
			bottom:0,
			ease:Circ.easeOut
		}, 0.25);	

	};

	that.switche = function(){

		var image = $('.imageSwitch > div');
		var text = $('.textSwitch *');

		image.css({
			left : function(){
				return -image.parents('section').width();
			},
			top : 0
		});

		text.css({ 'left' : function(){
			return text.parents('section').width();
		} });

		TweenMax.to(image, 0.7, {
			left:0,
			ease:Circ.easeOut
		});

		TweenMax.staggerTo(text, 0.7, {
			left : 0,
			ease:Circ.easeOut
		}, 0.2);
	};


	that.nanotek = function(){

		var text = $('.textNanotek *, .infoNanotek h3');
		var div = $('.imageNanotek div');

		text.css({ 'left' : function(){
			return -( text.parents('section').width() + text.width() )
		} });

		div.css({ 'bottom' : function(){
			return - ( div.parents('section').height() + div.height() )
		} })

		TweenMax.staggerTo(text, 0.7, {
			left:0,
			ease:Circ.easeOut
		}, 0.15);
		TweenMax.staggerTo(div, 0.7, {
			bottom : 0,
			delay : 0.2,
			ease:Circ.easeOut
		},0.35);

		this.filter();
	};

	that.hds = function(){

		var div = $('.imagehds > div');
		div.css({ 'left' : function(){
			return -( div.parents('section').width() + div.width() );
		} });

		var text = $('.texthds *');
		text.css({
			'position' : 'relative',
			'left' 	   : function(){
				return text.parents('section').width() + text.width() ;
			}
		});

		TweenMax.staggerTo(div, 0.7, {
			left:'0',
			ease:Circ.easeOut
		}, 0.3);
		TweenMax.staggerTo(text, 0.7, {
			left:'0',
			ease:Circ.easeOut
		}, 0.3);

		this.filter();
	};

	that.startHisotry = function(){

		var a = $('.navhistory a');
		TweenMax.staggerTo(a, 0, { 
			top:"-=30px",
			rotation:"-40deg", 
			scale:1.8, 
			alpha : 0,
			ease:Back.easeOut 
		});
		
		TweenMax.staggerTo(a, 1, { 
			top:"0",
			rotation:"0", 
			scale:1, 
			alpha : 1,
			ease:Back.easeOut 
		},0.3);
	}

	that.hd2012 = function(){

		var img = 
			$('#hd2012 .img')
				.children('div');

		var text = $('#hd2012 .info')
						.children('*');

		img.css({ 'top' : function(){
			return - ( img.parents('section').height() + img.height() );
		} });

		text.css({ 'bottom' : function(){
			return - ( text.parents('section').height() + text.height() );
		} });

		TweenMax.to(img, 0.7, {
			top : 0,
			delay : 0.2,
			ease:Circ.easeOut
		});
		TweenMax.staggerTo(text, 0.7, {
			bottom : 0,
			ease:Circ.easeOut
		}, 0.4);

	};

	that.switch2012 = function(){

		var img =
			$('#switch2012 .img')
				.children('div');

		var text = 
				$('#switch2012 .info')
					.children('*');

		img.css({ 'left' : function(){
			return -( img.parents('section').width() + img.width() );
		} });
		text.css({'left' : function(){
			return ( text.parents('section').width() + text.width() );
		} });

		TweenMax.to(img, 0.7, {
			left:0,
			ease:Circ.easeOut
		});
		TweenMax.staggerTo(text, 0.7, {
			left : 0,
			ease:Circ.easeOut
		},0.4);
	};

	that.nanotek2012 = function(){

		var img =
			$('#nanotek2012 .img')
				.children('div');

		var text = $('#nanotek2012 .info')
						.children('*');

		img.css({ 'top' : function(){
			return img.parents('section').width() + img.width();
		} });

		text.css({ 'left' : function(){
			return  text.parents('section').width() + text.width() ;
		} });

		TweenMax.to(img, 0.7, {
			top : 0,
			ease:Cubic.easeOut
		});
		TweenMax.staggerTo(text, 0.7, {
			left : 0,
			ease:Cubic.easeOut
		},0.25);
				

	};

	that.hds2012 = function(){

		var img = 
			$('#hds2012 .img')
				.find('div');

		var text = 
			$('#hds2012 .info')
				.children('*');

		img.css({'top' : function(){
			return -( img.parents('section').height() + img.height() );
		} });


		text.css({'top' : function(){
			return text.parents('section').height() + text.height() ;
		} });

		TweenMax.staggerTo(img, 0.7, {
			top : 0,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo(text, 0.7, {
			top : 0,
			ease:Circ.easeOut
		},0.4);

	};

	that.nanote2011 = function(){

		var img = 
			$('#nanotek2011 .img')
				.find('div');

		var text = 
			$('#nanotek2011 .info')
				.children('*');

		text.css({ 'right' : function(){
			return -( text.parents('section').width() + text.width() );
		} });

		img.css({ 'top' : function(){
			return img.parents('section').width() + img.width();
		} })

		TweenMax.staggerTo(img, 0.7, {
			top : 0,
			delay : 0.2,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo(text, 0.7, {
			right : 0,
			ease:Circ.easeOut
		},0.4);

	};

	that.hd2010 = function(){

		var img = 
			$('#hd2010 .img')
				.find('div');

		var text = 
			$('#hd2010 .info')
				.children('*');

		img.css({ 'top' : function(){
			return img.parents('section').height() + img.height();
		} });

		text.css({ 'top' : function(){
			return img.parents('section').height() + img.height();
		} });

		TweenMax.staggerTo( img, 0.7, {
			top : 0,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo( text, 0.7 ,{
			top : 0,
			ease:Circ.easeOut
		},0.4);
	};

	that.switch2010 = function(){

		var img = 
			$('#switch2010 .img')
				.find('div');

		var text = 
			$('#switch2010 .info')
				.children('*');

		img.css({ 'left' : function(){
			return -( img.parents('section').width() + img.width() );
		} });

		text.css({ 'left' : function(){
			return text.parents('section').width() + text.width();
		} });

		TweenMax.staggerTo( img, 0.7, {
			left : 0,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo( text, 0.7 ,{
			left : 0,
			ease:Circ.easeOut
		},0.4);
	};

	that.hd2009 = function(){

		var img = 
			$('#hd2009 .img')
				.find('div');

		var text = 
			$('#hd2009 .info')
				.children('*');	

		img.css({ 'top' : function(){
			return -( img.parents('section').height() + img.width() );
		} });

		text.css({ 'left' : function(){
			return text.parents('section').width() + text.width();
		} });
		TweenMax.staggerTo( img, 0.7, {
			top : 0,
			delay : 0.2
		}, 0.4);		
		TweenMax.staggerTo( text, 0.7, {
			left : 0
		}, 0.4);		
	};

	that.nanotek2007 = function(){

		var img = 
			$('#nanotek2007 .img')
				.find('div');

		var text = 
			$('#nanotek2007 .info')
				.children('*');	

		img.css({'top' : function(){
			return img.parents('section').height() + img.height();
		} });
		text.css({'left' : function(){
			return text.parents('section').width() + text.width();
		} });

		TweenMax.staggerTo( img, 0.7, {
			top : 0,
			delay : 0.2
		}, 0.4);		
		TweenMax.staggerTo( text, 0.7, {
			left : 0
		}, 0.4);	

	};

	that.hd2007 = function(){

		var img = 
			$('#hd2007 .img')
				.find('div');

		var text = 
			$('#hd2007 .info')
				.children('*');

		img.css({ 'right' : function(){
			return img.parents('section').width() + img.width();
		} });
		text.css({'left' : function(){
			return text.parents('section').width() + text.width();
		} });

		TweenMax.staggerTo( img, 0.7, {
			right : 0
		}, 0.4);		
		TweenMax.staggerTo( text, 0.7, {
			left : 0
		}, 0.4);

		// console.log('Start hd 2007');

	};

	that.hd2003 = function(){

		var img = 
			$('#hd2003 .img')
				.find('div');

		var text = 
			$('#hd2003 .info')
				.children('*');

		img.css({'top' : function(){
			return -( img.parents('section').height() + img.height() );
		} });

		text.css({'bottom' : function(){
			return -( text.parents('section').height() + text.height() );
		} });

		TweenMax.staggerTo( img, 0.7, {
			top : 0
		}, 0.4);		
		TweenMax.staggerTo( text, 0.7, {
			bottom : 0
		}, 0.4);

	}

	that.hdi2013 = function(){

		var img = 
			$('#hdi2013 .img')
				.find('div');

		var text = 
			$('#hdi2013 .info')
				.children('*');

		img.css({ 'top' : function(){
			return ( img.parents('section').height() + img.height() );
		} });
		text.css({'left' : function(){
			return ( text.parents('section').width() + text.width() );
		} });


		TweenMax.staggerTo( img, 0.7, {
			top : 0,
			delay : 0.2,
			ease:Circ.easeOut
		}, 0.25);		
		TweenMax.staggerTo( text, 0.7, {
			left : 0,
			ease:Circ.easeOut
		}, 0.25);
	};

	that.hd2013 = function(){
		var $divs = $('.img div');
		var $text = $('.info *');
		var $height = $(window).height() / 2;
		var $width = $(window).width() / 2;
		$divs.css('top', -$height - 100);
		$text.css('right', -$width - 100)

		TweenMax.staggerTo( $divs, 0.7, {
			top : 0,
			ease:Circ.easeOut
		}, 0.25);		
		TweenMax.staggerTo( $text, 0.7, {
			right : 0,
			ease:Circ.easeOut
		}, 0.25);
	}

	that.historyAll = function(){

		var box = 
			$('#history-all')
				.find('.box')
				.not('.none');

		box.css('opacity','0');
		TweenMax.staggerTo( box, 0.3, {
			alpha : 1,
			ease:Cubic.easeInOut
		}, 0.1);
	}

	that.scrolTop = function(){

		if( $('#main').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() - container.height();
		var scroll = yScrol > 0 ? yScrol : 0;

		container.animate({'scrollTop' : scroll},1000);

		this.top = true;
		this.bottom = false;
		this.selectAnimation();

	};
	
	that.scrollBotom = function(){
		// if( window.stopScroll && $('#newHD').hasClass('now') ) return;
		if( $('#photo').is('.now') || container.is(':animated') ) return;

		var yScrol = container.scrollTop() + container.height();
		container.animate({'scrollTop' : yScrol},1000);

		this.top = false;
		this.bottom = true;
		this.selectAnimation();

	};

	that.selectAnimation = function(){
		// console.log( '123' );
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

		var animationName = $('.now').data('animation');

		this.startanimate(animationName);
		this.titlePage();
		this.selectBackground();

	};

	that.startanimate = function(animationName){
		switch ( animationName ){
			case 'first' :
				// console.log('Start first animation');
				break;
			case 'second' :
				this.boxes();
				break;
			case 'third' :
				this.siteHdi();
				break;
			case 'fourth' :
				// console.log('Start animation filter');
				break;
			case 'fiveth' :
				this.siteHd();
				break;
			case 'sixeth' :
				this.switche()
				break;
			case 'seventh' :
				this.nanotek();
				break;
			case 'eighth' :
				this.hds()
				break;
			case 'nineth' :
				this.startHisotry();
				break;
			case 'tenth' :
				this.hd2012();
				break;
			case 'eleventh' :
				this.switch2012();
				break;
			case 'thirteenth' : 
				this.nanotek2012();
				break;
			case 'fourteen' :
				this.hds2012();
				break;
			case 'fiveteen' :
				this.nanote2011();
				break;
			case 'sixteen' :
				this.hd2010();
				break;
			case 'seventeen' :
				this.switch2010();
				break;
			case 'eighteen' :
				this.hd2009();
				break;
			case 'nineteen' :
				this.nanotek2007();
				break;
			case 'twenty' :
				this.hd2007();
				break;
			case 'twentyOne' :
				this.hd2003();
				break;
			case 'twentTwo' :
				this.hdi2013();
				break;
			case 'tweentyThree' :
				this.historyAll();
				break;
			case 'tweentyFour' :
				this.hd2013();
				break;
		}

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
			case 'feedback' :
				$('.title-block').html('<span>00.4 /</span> Ваш відгук про Kent HD');
				break;
            case 'collage' :
				$('.title-block').html('<span>00.5 /</span> Вашi колажи');
				break;
			case 'profile' : 
				$('.title-block').html('<span>00.5 /</span> Профайл');
				break;
			case 'photo' :
				$('.title-block').html('<span>00.6 /</span> ФОТОЗВІТ / TURBO PARTY Зелений театр 05.07.2013');
				break;
			default :
				$('.title-block').html('');
		}

	};

	that.selectBackground = function(){

		var array = [
			'line','one', 'two', 'three', 'four', 'five','six', 'seven'
		];

		var number = Math.floor( Math.random() * array.length );

		switch ( array[number] ){
			case 'line' : 
				lines.line();
				break;
			case 'one' :
				lines.one();
				break;
			case 'two' :
				lines.two();
				break;
			case 'three' :
				lines.three();
				break;
			case 'four' :
				lines.four();
				break;
			case 'five' :
				lines.five();
				break;
			case 'six' :
				lines.six();
				break;
			case 'seven' :
				lines.seven();
				break;
		}
	};
	return that;
};

$(document).ready(function(){

	var animation = action();
	var lines  = background();
	var container = $('.container-fluid');

	animation.arrow();

	var t,l = new Date().getTime();
	container.on({
		mousewheel : function(event, delta){
			if( window.stopScrollAll && $('#newHD').hasClass('now') ) return
			if(delta > 0){
	    		animation.scrolTop();
		    }
		    else{
		   		animation.scrollBotom();
		    }
			
		},

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
			// photo
            if( $('#photo').is( '.now' ) ){
	            var title = '<span>00.6 / ФОТОЗВІТ /</span>' + ($('.putty').text()).replace(/\//g,'.');
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

			var categoryname = $('.now').data('name');
			$('.nav-scategory .active').removeClass('active');

			$('.nav-scategory li')
				.each(function(){

					if( $(this).attr('name') === categoryname ){

						$('.nav-scategory').show();
					
						$(this).addClass('active');

						var li = $('.nav-scategory li').not('.active');
						// console.log($(this).parent().attr('class'));
						if( !$(this).parent().is('.mouseenter') ){
							// console.log('Parent is mouseenter');
							TweenMax.staggerTo(li,0.3,{left:'93px'},0.25);

						}

						return false;
					}

				});
			TweenMax.to($('.nav-scategory .active'),0.5,{left:'0'});
			if(!$('.nav-scategory .active').length){
		
				TweenMax.staggerTo($('.nav-scategory li'),0.3,{
					left:'91px',
					onComplete : function(){
						$('.nav-scategory').fadeOut();
					}
				},0.25);

			}


			// all History button
			var now = $('section.now');

			if( now.data('slide') === 'history' && 
				!now.is( '#history-main' ) && 
				!now.is( '#history-all' ) ){

				$('.allHistory').fadeIn();

			}
			else{

				$('.allHistory').fadeOut();

			}

			// nav photo
			var liPhoto
			if( $('section.now').attr('id') === 'photo' ){

				$('.nav-photo').show();
	
				liPhoto = $('.nav-photo li');
				liPhoto.css({
					left : 0,
					width: 100
				});
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
			// feedback button
			if( $('section.now').attr('id') === 'site-hd' )
				$('.container-feedback').addClass('active');
			else
				$('.container-feedback').removeClass('active');

		}

	});
	
	function clickboxe(name){

		$('.container-fluid section')
			.each(function(){

			var dataname = $(this).data('name');
			
			if(dataname === name){

				$('section.now').removeClass('now');
				$(this).addClass('now');

				var y = $(this).offset().top;
				var animationName = $(this).data('animation');

				container
					.animate({'scrollTop' : container.scrollTop() + y},1000);

				animation.startanimate(animationName);
				animation.selectBackground();

				return false;
			}

		});

	}; 

	// feeback click
	$('.container-feedback').on('click', function(e){
		$('a[data-slide="feedback"]').parent().click();
	});

	//  navigate site hover
	$('.nav-site')
		.on({
			mousemove : function(e){
	
				if( $(this).find('li').width() != 42) return;

				var x = e.pageX;
				var li = $(this).find('li');

				if(x > 40) return;

				TweenMax.staggerTo(li, 0.3, {width:'210px'}, 0.25);	

			},
			mouseleave : function(){

				var li = $(this).find('li');

				TweenMax.staggerTo(li, 0.3, {
					width:'42px'
				}, 0.25);

			}
		});

	// navigate category hover and click
	$('.nav-scategory')
		.on({

			mouseenter : function(){

				var li = 
					$(this)
						.children('li');

				$(this).addClass('mouseenter');

				TweenMax.staggerTo(li,0.3,{'left' : 0},0.25);

			},
			mouseleave : function(){
				$(this).removeClass('mouseenter');
				var li = 
					$(this)
						.children('li')
						.not('.active');

				TweenMax.staggerTo(li, 0.3, {'left' : '93px'}, 0.25);

			}
		})
		.find('li')
		.on({
			click : function(){
				clickboxe( $(this).attr('name') );
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
 				})
				// TweenMax.staggerTo(li, 0.3, {
				// 	'left' : 40,
				// 	onComplete : function(){
				// 		li.width(40);
				// 	}
				// }, 0.25);

			}
		})


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

							animation.startanimate(animationName);
							animation.titlePage();
							animation.selectBackground();

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

	$(document).on({
		keydown : function(e){

			var up = 38,
				down = 40;

			if (e.keyCode == up) {
				// console.log('Scroll Top');
				animation.scrolTop();
	   		}
		   	else if (e.keyCode == down) {
		   		// console.log('Scroll Bottom');
		   		animation.scrollBotom();
		    }

		}
	});


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

	$('.allHistory')
		.on({
			click : function(e){

				e.preventDefault();
				var history = $('#history-all');
				var y = history.offset().top + container.scrollTop();

				$('section.now').removeClass('now');
				history.addClass('now');
				container.animate({'scrollTop' : y},1000);
				
			}
		});

	var boxes = $('#history-all').find('.box')
	// TweenMax.staggerTo(boxes,0,{
	// 	scale : 0.98
	// },0);
	//box in all history slide
	boxes
		.on({
			// mouseenter : function(){

			// 	TweenMax.to($(this),0.1,{
			// 		scale : 1
			// 	});

			// },
			// mouseleave : function(){

			// 	TweenMax.to($(this),0.1,{
			// 		scale : 0.98
			// 	});
			// },
			click : function(){

				var slide = $(this).data('scroll');
				var block = $('#' + slide);
				var y = block.offset().top + container.scrollTop();

				$('section.now').removeClass('now');
				block.addClass('now');	

				container.animate({'scrollTop' : y},1000);
				animation.startanimate(block.data('animation'));
				animation.selectBackground();
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

			if ( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ){
				lines.resize();
				animation.selectBackground();
			}
			else{
				lines.resize();
			}
			

		}
	});

	$('.container-fluid').css({
		'height' : function(){

			var size = $('.xv').height() + $('.fotter').height();
			return $('body').height() - size;

		}
	});

})