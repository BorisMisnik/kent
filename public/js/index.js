$(function(){
	var container = $('.container-fluid');
	var raphael = background();
	var markerMonth = true;
 	function scrollBar(){
        if ( markerMonth ) {

                $(".ik_select_list_inner")
                    .mCustomScrollbar({
                        advanced:{ updateOnContentResize: true },
                        mouseWheel : true
                    });
             markerMonth = false;
         }
    }

    function sigrates(){

    	if($('.ik_select_list_inner').hasClass('mCustomScrollbar')) return;

    	$('.ik_select_list_inner')
    		 .mCustomScrollbar({
               	advanced:{ updateOnContentResize: true },
               	mouseWheel : true,
               	set_height : 100
            });
    }

	$('#month').ikSelect({
        ddFullWidth : false,
        autoWidth : false,
        ddMaxHeight  :114,
        ddCustomClass: "month",
        onShow : scrollBar
    });

	$('.smoke select').ikSelect({
		ddFullWidth : false,
        autoWidth : false,
        onShow : sigrates
	});

	$('input[placeholder], textarea[placeholder]').placeholder();

	var timerShow;
	var menuLi = $('.nav-site').children('li');

	$('.nav-site').on({
		'mouseleave' : navSiteMouseleave
	}).children('li')
	  .on({'mouseenter' : navSiteMouseenter});
	  
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


    $('.month .ik_select_option').click(function(){
        var $this = $(this);
        $this.attr('title',$this.data('title'))
 
    }).hover(function(){
    	$(this).data('title',$(this).attr('title'))
    		   .attr('title','');
    },function(){
        $(this).attr('title',$(this).data('title'));
    });

    $('.month .ik_select_option').attr({
    	'name' : $(this).attr('title')
    });


	$(window).resize(function(){
		sizeSection();

		raphael.w = container.width();
		raphael.h = container.height();

		raphael.p.setSize(raphael.w,raphael.h); 
	});

	function sizeSection(){

		$('.scrollButton').css({
			'bottom' : function(){
				var bottom = $('.footer').height() + $('.xv').height() + 49;
				return bottom;
			}
		});

		$('article').css('height',container.height());
		container.scrollTop(container.scrollTop() + $('section.now').offset().top);
	};

	
	sizeSection();
	// button send question
	$('.button-wrapper a')
		.on({
			click : function(e){
				e.preventDefault();
				var block = $('.block-wrapper');

				if(!block.is(':visible')){
					block
						.find('p')
						.hide();
					block
						.find('form')
						.show();
					block.fadeIn();
				}
				else{
					block.fadeOut();
				}
			}
		});

	// submit form massege

	$('.block-wrapper form')
		.on({
			submit : function(e){
				e.preventDefault();

				$(this)
					.fadeOut();

				$(this)
					.parent()
					.find('p')
					.fadeIn();

			}
		});

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