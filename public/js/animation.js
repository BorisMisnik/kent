var action = function () {

	var that = {};
	var container = $('.container-fluid');

	that.arrow = function(){

		var tweenArrwo = new TimelineLite();
		TweenMax.to($('.arrow-start'), .6, {top:"-5px",
                       repeat:-1, yoyo:true});

		return that;	
	};

	that.boxes = function(){
		$('.wrapeer').css({'top' : '150%'})
		TweenMax.staggerTo($('.wrapeer'),0.5,{top:'50%'},0.25);	
	};

	that.siteHdi = function(){

		var div = $('.block-image > div');
		var p = $('.hdiBlock .about-pack, .about-technology');
		div.css('top','400px');
		p.css('opacity',0);

		$('.hdiBlock .title').css('left','400px');
		$('.hdi .submit').css('opacity',0);

		TweenMax.staggerTo(div,1, {top:'0'}, 0.25);	
		TweenMax.staggerTo([ p, $('.hdi .submit') ], 2, {opacity : 1} ,1);
		TweenMax.staggerTo( $('.hdiBlock .title'), 0.5, {left : 0});
		this.filter();
	};

	that.filter = function(){

		$('.sigaret').css('bottom','-382px');

		TweenMax.to($('.sigaret'), 1, {bottom:0});

	};

	that.siteHd = function(){

		var div = $('.wrapper-box > div');
		div.css('left','800px');

		TweenMax.staggerTo(div,1, {
			left:0,
			ease:Circ.easeOut
		}, 0.5);	

	};

	that.switche = function(){

		var image = $('.imageSwitch > div');
		image.css({
			'top' : '337px',
			'left' : '-300px'
		});

		var text = $('.textSwitch *');
		TweenMax.staggerTo(text, 0, {scale:'0'});

		TweenMax.staggerTo(text, 0.6, {scale:'1'}, 0.4);
		TweenMax.to(image, 0.7, {
			top:0,
			left:0,
			ease:Circ.easeOut
		});

	};


	that.nanotek = function(){

		var p = $('.textNanotek p');
		var div = $('.imageNanotek div');

		p.css('left','-300px');
		TweenMax.staggerTo(div, 0, {scale:'0'});

		TweenMax.staggerTo(p, 1, {left:'0'}, 0.35);
		TweenMax.staggerTo(div, 1.2, {
			scale:'1',
			ease:Circ.easeOut
		},0.35);
	};

	that.hds = function(){

		var div = $('.imagehds > div');
		div.css('left','-400px');

		var text = $('.texthds *');
		text.css({
			'position' : 'relative',
			'left' 	   : '400px'
		});

		TweenMax.staggerTo(div, 1, {
			left:'0',
			ease:Circ.easeOut
		}, 0.35);
		TweenMax.staggerTo(text, 1, {
			left:'0',
			ease:Circ.easeOut
		}, 0.35);

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

		TweenMax.to(img,0,{
			scale : 0
		});
		TweenMax.staggerTo(text,0,{
			scale : 0
		});

		TweenMax.to(img,1,{
			scale : 1,
			ease:Back.easeInOut
		});
		TweenMax.staggerTo(text,1,{
			scale : 1,
			ease:Back.easeInOut
		},0.4);

	};

	that.switch2012 = function(){

		var img =
			$('#switch2012 .img')
				.children('div');

		var text = $('#switch2012 .info')
						.children('*');

		TweenMax.to(img,0,{
			rotation : '-360deg'
		});
		TweenMax.staggerTo(text,0,{
			left 	 : '430px'
		});

		TweenMax.to(img,1,{
			rotation : 0,
			ease:Back.easeOut
		});
		TweenMax.staggerTo(text,1,{
			left : 0,
			ease:Back.easeOut
		},0.4);
	};

	that.nanotek2012 = function(){

		var img =
			$('#nanotek2012 .img')
				.children('div');

		var text = $('#nanotek2012 .info')
						.children('*');

		img.css('top','800px');
		text.css('left','-400px');

		TweenMax.to(img,1,{
			top : 0,
			ease:Cubic.easeOut
		});
		TweenMax.staggerTo(text,1,{
			left : 0,
			ease:Cubic.easeOut
		},0.3);
				

	};

	that.hds2012 = function(){

		var img = 
			$('#hds2012 .img')
				.find('div');

		var text = 
			$('#hds2012 .info')
				.children('*');

		img.css('top','800px');
		TweenMax.staggerTo(text,0,{
			scale : 0
		});

		TweenMax.staggerTo(img,1,{
			top : 0,
			ease:Circ.easeOut
		},0.4);
		TweenMax.staggerTo(text,1,{
			scale : 1,
			ease:Back.easeOut
		},0.4);

	};

	that.nanote2011 = function(){

		var img = 
			$('#nanotek2011 .img')
				.find('div');

		var text = 
			$('#nanotek2011 .info')
				.children('*');

		TweenMax.staggerTo(img,0,{
			scale : 0
		});
		text.css('right','-800px');

		TweenMax.staggerTo(img,1,{
			scale : 1,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo(text,1,{
			right : 0,
			ease:Back.easeOut
		},0.5);

	};

	that.hd2010 = function(){

		var img = 
			$('#hd2010 .img')
				.find('div');

		var text = 
			$('#hd2010 .info')
				.children('*');

		img.css('top','900px');
		text.css('top','-900px');

		TweenMax.staggerTo( img,1,{
			top : 0,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo( text, 1 ,{
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

		img.css('left','-900px');
		text.css('top','900px');

		TweenMax.staggerTo( img,1,{
			left : 0,
			ease:Circ.easeOut
		},0.4);

		TweenMax.staggerTo( text, 1 ,{
			top : 0,
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


		TweenMax.staggerTo( img, 0, {
			scale : 0
		});		
		TweenMax.staggerTo( text, 0, {
			alpha : 0
		});

		TweenMax.staggerTo( img, 0.8, {
			scale : 1
		}, 0.5);		
		TweenMax.staggerTo( text, 1, {
			alpha : 1
		}, 0.5);		
	};

	that.nanotek2007 = function(){

		var img = 
			$('#nanotek2007 .img')
				.find('div');

		var text = 
			$('#nanotek2007 .info')
				.children('*');	

		img.css('right','-800px');
		text.css('left','-800px');


		TweenMax.staggerTo( img, 1, {
			right : 0
		}, 0.5);		
		TweenMax.staggerTo( text, 1, {
			left : 0
		}, 0.5);	

	};

	that.hd2007 = function(){

		var img = 
			$('#hd2007 .img')
				.find('div');

		var text = 
			$('#hd2007 .info')
				.children('*');

		img.css('right','800px');
		text.css('left','800px');

		TweenMax.staggerTo( img, 1, {
			right : 0
		}, 0.5);		
		TweenMax.staggerTo( text, 1, {
			left : 0
		}, 0.5);

		console.log('Start hd 2007');

	};

	that.hd2003 = function(){

		var img = 
			$('#hd2003 .img')
				.find('div');

		var text = 
			$('#hd2003 .info')
				.children('*');

		img.css('top','-800px');
		text.css('bottom','-800px');

		TweenMax.staggerTo( img, 1, {
			top : 0
		}, 0.5);		
		TweenMax.staggerTo( text, 1, {
			bottom : 0
		}, 0.5);

	}

	that.hdi2013 = function(){

		var img = 
			$('#hdi2013 .img')
				.find('div');

		var text = 
			$('#hdi2013 .info')
				.children('*');

		img.css('top','800px');
		text.css('top','-800px');


		TweenMax.staggerTo( img, 1, {
			top : 0,
			ease:Circ.easeOut
		}, 0.5);		
		TweenMax.staggerTo( text, 1, {
			top : 0,
			ease:Circ.easeOut
		}, 0.5);
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
		
		if( $('#profile').is('.now') || container.is(':animated') ) return;

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

			if( !$('#history-all').is(':visible') && $('#history-all').is('.now') ){

				$('#history-all')
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

			if( !$('#history-all').is(':visible') && $('#history-all').is('.now') ){

				$('#history-all')
					.removeClass('now')
					.next()
					.addClass('now');

			}
		}

		var animationName = $('.now').data('animation');
		this.startanimate(animationName);
		this.titlePage();
	};

	that.startanimate = function(animationName){

		switch ( animationName ){

			case 'first' :
				console.log('Start first animation');
				break;
			case 'second' :
				this.boxes();
				break;
			case 'third' :
				this.siteHdi();
				break;
			case 'fourth' :
				console.log('Start animation filter');
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
		}

	};

	that.titlePage = function(){

		var slide = $('section.now').data('slide');

		switch (slide) {
			case 'sigarets' : 
				$('.title-block').html('Сигарети KENT <span>/ 00.1</span>');
				break;
			case 'history' :
				$('.title-block').html('История КЕНТ <span>/ 00.2</span>');
				break;
			case 'question' :
				$('.title-block').html('Вопросы-ответы <span>/ 00.3</span>');
				break;
			case 'profile' : 
				$('.title-block').html('Профайл <span>/ 00.4</span>');
				break;
			default :
				$('.title-block').html('');
		}

	};

	var historyHronologi = {

		all : [ 
			$('#hd2012'), $('#switch2012'), $('#nanotek2012'),
			$('#hds2012'), $('#nanotek2011'), $('#hd2010'),
			$('#switch2010'), $('#hd2009'), $('#nanotek2007'),
			$('#hd2007'), $('#hd2003')
		],
		hdi : [
		
		],
		'switch' : [
			$('#switch2012'), $('#switch2010')
		],
		naotek : [
			$('#nanotek2007'), $('#nanotek2011'), $('#nanotek2012')
		],
		hd: [
			$('#hd2003'), $('#hd2007'), $('#hd2009'), $('#hd2010'),
			$('#hd2012')
		],
		hds : [
			$('#hds2012')	
		]
	};

	that.historyHdi = function(){

		var y = $('#hdi2013').offset().top + container.scrollTop();

		container.animate({'scrollTop' : y},1000);
		this.hdi2013();

		$('section.now').removeClass('now');
		$('#hdi2013').addClass('now');


	};

	that.historySwitch = function(){

		

	}

	return that;
};

$(document).ready(function(){

	var animation = action();
	var container = $('.container-fluid');
	var sections = [
		$('#main'),$('#mainSecond'),$('#profile')
	];
	animation.arrow();

	var t = new Date().getTime(),l;
	container.on({
		mousewheel : function(event, delta){
				
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

			if(now - l > 1000){
				$this.trigger('scrollStart');
				l = now;
			}

			clearTimeout(t);
			t = setTimeout(function(){
				$this.trigger('scrollEnd')
			},300);

		},	

		scrollStart : function(){

			// console.log('Scroll Start');
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
						console.log($(this).parent().attr('class'));
						if( !$(this).parent().is('.mouseenter') ){
							console.log('Parent is mouseenter');
							TweenMax.staggerTo(li,0.5,{left:'63px'},0.25);

						}
						TweenMax.to($('.nav-scategory .active'),0.5,{left:'0'});

						return false;
					}

				});

			if(!$('.nav-scategory .active').length){
		
				TweenMax.staggerTo($('.nav-scategory li'),0.5,{
					left:'85px',
					onComplete : function(){
						$('.nav-scategory').fadeOut();
					}
				},0.25);

			}

		}

	});

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

							return false;
						}

					});
		
			}
		});

	function clickboxe(name){
		console.log(name);
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

				return false;
			}

		});

	}; 

	$('.nav-scategory')
		.on({

			mouseenter : function(){

				var li = 
					$(this)
						.children('li')
						.not('.active');

				$(this).addClass('mouseenter');

				TweenMax.staggerTo(li,0.5,{'left' : 0},0.25);

			},
			mouseleave : function(){
				$(this).removeClass('mouseenter');
				var li = 
					$(this)
						.children('li')
						.not('.active');

				TweenMax.staggerTo(li,0.5,{'left' : '60px'},0.25);

			},
			mousemove : function(){
				
			}

		})
		.find('li')
		.on({
			click : function(){
				clickboxe( $(this).attr('name') );
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

					$('.hdiShort').css('visibility','hidden');
					$('.aboutFilter').show();

					var left  = -$('.hdiShort').width();
					var right = -$('.aboutFilter').width()/2;
					TweenMax.to( $('.hdiShort'),1,{ left:left } );
					TweenMax.to( $('.aboutFilter'),1,{ marginRight:right } );

				}
				else{

					$('.hdiShort').css('visibility','visible');
					$('.aboutFilter').hide();

					var left  = 0;
					var right = -3000;
					TweenMax.to( $('.hdiShort'),1,{ left:left } );
					TweenMax.to( $('.aboutFilter'),1,{ marginRight:right } );

				}
				animation.siteHdi();
			}
		});

	$('#site-hds')
		.find('.submit')
		.on({
			click : function(){

				if($(this).is('.moreDetail')){

					$('.hdsifno').css('visibility','hidden');
					$('.aboutFilter').show();

					var left  = -$('.hdsifno').width();
					var right = -$('.aboutFilter').width()/2;
					TweenMax.to( $('.hdsifno'),1,{ left:left } );
					TweenMax.to( $('.aboutFilter'),1,{ marginRight:right } );

				}
				else{
			
					$('.hdsifno').css('visibility','visible');
					$('.aboutFilter').hide();

					var left  = 0;
					var right = -3000;
					TweenMax.to( $('.hdsifno'),1,{ left:left } );
					TweenMax.to( $('.aboutFilter'),1,{ marginRight:right } );

				}
				
				animation.hds();
			}
		});

	$('.allHistory')
		.on({
			click : function(e){

				e.preventDefault();
				var history = $('#history-all');
				history.show();

				var y = history.offset().top + container.scrollTop();

				$('section.now').removeClass('now');
				history.addClass('now');
				container.animate({'scrollTop' : y},1000);
				
			}
		});

	$('.closeHisotry')
		.on({
			click : function(e){

				e.preventDefault();
				var history = $('#history-all');
				var y = $('#history-main').offset().top + container.scrollTop();

				$('section.now').removeClass('now');
				$('#history-main').addClass('now');
				container.animate({'scrollTop' : y},1000,function(){
					history.hide();
				});

			}
		});

	$('.navhistory')
		.children('a')
		.on({
			click : function(e){

				e.preventDefault();
				var name = $(this).attr('name');

				switch (name) {
					case 'hdi' :
						animation.historyHdi()
						break;
					case 'switch' : 
						animation.historySwitch();
						break;

				}

			}	
		})

	$(window).on({
		resize : function(){

			if($('.hdiShort').css('visibility') === 'hidden'){

				var right = -$('.aboutFilter').width()/2;
				$('.aboutFilter').css('margin-right',right);

				var left = -$('.hdiShort').width();
				$('.hdiShort').css('left' , left);

			}
			else if($('.hdsifno').css('visibility') === 'hidden'){

				var right = -$('.aboutFilter').width()/2;
				$('.aboutFilter').css('margin-right',right);

				var left = -$('.hdsifno').width();
				$('.hdsifno').css('left' , left);

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