$(function(){
	var container = $('.container-fluid');
	var articles = $('article').not('.copy');
	var menuLi = $('.nav-site').children('li');
	var buttonScroll = $('.scrollButton a');
	var copy;
	var cateGoryName;
	var raphael = background();

	var tl = new TimelineLite();
	var marker = true;
 	function scrollBar(){
         if ( marker ) {
                $(".ik_select_list_inner")
                    .mCustomScrollbar({
                        advanced:{ updateOnContentResize: true },
                        mouseWheel : true
                    });
                marker = false;
         }

    }	
	   $('#month').ikSelect({
                        ddFullWidth : false,
                        autoWidth : false,
                        ddMaxHeight  :114,
                        onShow : scrollBar
                    });
	$('.nav-site').on('click','li',clickMenu);

	$('.nav-site').on({
		'mouseleave' : navSiteMouseleave
	}).children('li')
	  .on({'mouseenter' : navSiteMouseenter});


	$(window).resize(function(){
		sizeSection();

		raphael.w = container.width();
		raphael.h = container.height();

		raphael.p.setSize(raphael.w,raphael.h); 
	});

	buttonScroll.on('click',clickScrollButon);
	
	container.on('mousewheel', function(event, delta, deltaX, deltaY){
		if(!container.is(':animated')){
	    	if(delta > 0){
	    		container.animate({'scrollTop' : '-=' + container.height()},1100,'easeOutCubic',stopScroll);
	    		changeBacground();
	    	}
	    	else if(!$('.now').is('.last')){
	   			container.animate({'scrollTop' : '+=' + container.height()},1100,'easeOutCubic',stopScroll);
	    	}
		}
	});

	$(document).on('keydown',function(e){
		var up = 38,
			down = 40;

		if(!container.is(':animated')){
			if (e.keyCode == up) {
	        	container.animate({'scrollTop' : '-=' + container.height()},1100,'easeOutCubic',stopScroll);
	        	 changeBacground();
	   		}
		    if (e.keyCode == down && !$('.now').is('.last')) {
		        container.animate({'scrollTop' : '+=' + container.height()},1100,'easeOutCubic',stopScroll);
		    }
		   
		}
	});

	function showFirstPage(){
		$('.packOne, .packTwo').stop(true,true).animate({
			'top' : '7px'
		},850);

		$('.title').stop(true,true).animate({
			opacity : 1,
			left : 0
		},1000);

		$('.about-pack, .description').stop(true,true).animate({
			opacity : 1
		},1500)

	}
	showFirstPage();

	function changeBacground(){
		$('.ik_select_block').hide();
		console.log(container.scrollTop() - container.height())
		// alert(container.scrollTop() - container.height())
		if(container.scrollTop() - container.height() === 0){
			showFirstPage();
		}
	};

	function sizeSection(){

		$('.scrollButton').css({
			'bottom' : function(){
				var bottom = $('.footer').height() + $('.xv').height() + 49;
				return bottom;
			}
		});


		$('article').css('height',container.height());

		container.find('section').each(function(){
			var $this 		  = $(this);
			var allArticle 	  = $this.children('article').length;
			var heightArticle = $this.children('article').height()
			$this.css('height',heightArticle * allArticle);

		});

		var activeSection = $('.active').data('slide');
		container.scrollTop(container.scrollTop() + $('.now').offset().top);
	};

	function clickMenu(){ 
		var $this = $(this);
		var slide = $this.data('slide');

		container.stop(true,true).animate({'scrollTop' : '+=' + $(slide).offset().top},1100,'easeOutCubic',stopScroll);
		changeBacground();
	};

	function clickScrollButon(e){
		e.preventDefault();

		var $this = $(this);
		if(!container.is(':animated')){
			if($this.is('.prev')){
				container.stop(true,true).animate({'scrollTop' : '-=' + container.height()},1100,'easeOutCubic',stopScroll);
			}	
			else if(!$('.now').is('.last')){
				container.stop(true,true).animate({'scrollTop' : '+=' + container.height()},1100,'easeOutCubic',stopScroll);
			}
			changeBacground();
		}
	};

	var timerShow;
	function navSiteMouseenter(){
		var timer = 0;
		if(timerShow){	
			clearTimeout(timerShow);
			timerShow = null;
		}
		$('.nav-site').addClass('mouseenter').css('z-index',15);

		menuLi.each(function(){
			var $this = $(this);
			setTimeout(function(){
				$this.find('span').animate({'right' : '0'},500,'easeOutCubic')	
			},timer);
			timer += 200;
		});
	};

	function navSiteMouseleave(){
		var timer = 0;
		timerShow = setTimeout(function(){
			menuLi.each(function(){
				var $this = $(this);
				setTimeout(function(){
					$this.stop(true,true).find('span').animate({'right' : '214px'},500,'easeOutCubic')	
				},timer);
				timer += 200;
			});
			$('.nav-site').removeClass('mouseenter').css('z-index',11);
		},600)
	};

	var timerShowCategory;

	function stopScroll(){  
		var activeMenu;
		var now;

		$('.now').removeClass('now');
		$('.active').removeClass('active')

		articles.each(function(){  
			var $this = $(this);

			if(!$this.is('.profile-article') && container.scrollTop() != 0){
				$this.find("*").removeAttr('style');
			}

			if($this.offset().top === 0 && $this.is(':visible')){

				$this.addClass('now');  

				now = $('.now');
				activeMenu = $this.parent().attr('id');
				return false;
			}
		});

		menuLi.each(function(){
			var $this = $(this);

			if($this.data('slide') === '#' + activeMenu){
				$this.addClass('active').find('span').animate({'right' : '284px'},500);
			}
			else{
				$this.find('span').animate({'right' : '284px'},500);
			}

		});


		if(cateGoryName){
			if($('.copy.' + cateGoryName).data('name') !== navCategory.children('.active').text().toLowerCase() && $('.copy.' + cateGoryName).is(':visible')){
				$('.copy.' + cateGoryName).hide();
				container.scrollTop(container.scrollTop() + $('.now').offset().top);
				articles = $('article').not('.copy');
			}
		}
	}
	sizeSection();

 // background
	function background(){
		var that = {};

		that.w = container.width();
		that.h = container.height() + 30;

		that.sin = 0.01;
		that.cos = 0.005;
		that.angleoff = 1.9;

		var sin = that.sin;
		var cos = that.cos;

		var angleoff = that.angleoff;
		var ang = that.ang;

		var cratesPath = [];

		var timer;

		that.crateCanvas = function(){
			this.p = new Raphael(document.getElementById('svg'),this.w,this.h);

			var h = that.h;
			var w = that.w;

			var lines = [
				"M0 "+(h*0.52)+"R"+(w*0.64)+" "+(h*0.49)+" "+w+" "+(h*0.04),
				"M0 "+(h*0.57)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
				"M0 "+(h*0.62)+"R"+(w*0.64)+" "+(h*0.59)+" "+w+" "+(h*0.16),
				"M0 "+(h*0.67)+"R"+(w*0.64)+" "+(h*0.64)+" "+w+" "+(h*0.22),
				"M0 "+(h*0.72)+"R"+(w*0.64)+" "+(h*0.69)+" "+w+" "+(h*0.28),
				"M0 "+(h*0.77)+"R"+(w*0.64)+" "+(h*0.74)+" "+w+" "+(h*0.34),
				"M0 "+(h*0.82)+"R"+(w*0.64)+" "+(h*0.79)+" "+w+" "+(h*0.40),
				"M0 "+(h*0.87)+"R"+(w*0.64)+" "+(h*0.84)+" "+w+" "+(h*0.46),
				"M0 "+(h*0.93)+"R"+(w*0.64)+" "+(h*0.90)+" "+w+" "+(h*0.52),
			];
			
			for (var i = 0; i < lines.length; i++) {
				cratesPath.push(this.p.path(lines[i]).attr({'stroke':'#c6c7c7'}));
			};

			return this;
		};

		that.firstBackground = function(){
			clearTimeout(timer);
			var p = that.p;

			var h = that.h;
			var w = that.w;

			var y  = 0.05 * Math.sin(angleoff) + 0.3;
			var x  = 0.05 * Math.sin(angleoff) + 0.5;

			var lines = [
				"M0 "+(0)+"R"+(w*x)+" "+((h*y))+" "+(w-320)+" "+(h),
				"M40 "+(0)+"R"+(w*x)+" "+((h*y)+40)+" "+(w-280)+" "+(h),
				"M80 "+(0)+"R"+(w*x)+" "+((h*y)+80)+" "+(w-240)+" "+(h),
				"M120 "+(0)+"R"+(w*x)+" "+((h*y)+120)+" "+(w-200)+" "+(h),
				"M160 "+(0)+"R"+(w*x)+" "+((h*y)+160)+" "+(w-160)+" "+(h),
				"M200 "+(0)+"R"+(w*x)+" "+((h*y)+200)+" "+(w-120)+" "+(h),
				"M240 "+(0)+"R"+(w*x)+" "+((h*y)+240)+" "+(w-80)+" "+(h),
				"M280 "+(0)+"R"+(w*x)+" "+((h*y)+280)+" "+(w-40)+" "+(h),
				"M320 "+(0)+"R"+(w*x)+" "+((h*y)+320)+" "+(w)+" "+(h)
			];

			for (var i = 0; i < cratesPath.length; i++) {
				cratesPath[i].animate({
					path : lines[i]
				},2000,'cubic-bezier(.39,.58,.56,1)');

				if(i===cratesPath.length-1){
					animate(0.11);
				}
			};

			function animate(angleoffdelta){

				var h = that.h;
				var w = that.w;

				var y  = 0.25 * Math.sin(angleoff) + 0.3;
				var x  = 0.2 * Math.sin(angleoff) + 0.5;

				var lines = [
					"M0 "+(0)+"R"+(w*x)+" "+((h*y))+" "+(w-320)+" "+(h),
					"M40 "+(0)+"R"+(w*x)+" "+((h*y)+40)+" "+(w-280)+" "+(h),
					"M80 "+(0)+"R"+(w*x)+" "+((h*y)+80)+" "+(w-240)+" "+(h),
					"M120 "+(0)+"R"+(w*x)+" "+((h*y)+120)+" "+(w-200)+" "+(h),
					"M160 "+(0)+"R"+(w*x)+" "+((h*y)+160)+" "+(w-160)+" "+(h),
					"M200 "+(0)+"R"+(w*x)+" "+((h*y)+200)+" "+(w-120)+" "+(h),
					"M240 "+(0)+"R"+(w*x)+" "+((h*y)+240)+" "+(w-80)+" "+(h),
					"M280 "+(0)+"R"+(w*x)+" "+((h*y)+280)+" "+(w-40)+" "+(h),
					"M320 "+(0)+"R"+(w*x)+" "+((h*y)+320)+" "+(w)+" "+(h)
				];

				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				timer = setTimeout(function(){animate(angleoffdelta)},500);

			}

			return this;
		};

		return that; 
	}
	raphael.crateCanvas()
		   .firstBackground();
});