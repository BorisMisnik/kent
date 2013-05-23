var background = function(){

	var svg  =  document.getElementById('svg');
	var cratesPath = [];
	var angleoff = 1.9;
	var timer;

	var body = $('body')
	, hv = $('.xv')
	, footer = $('.footer')
	, container = $('.container-fluid');

	var h = body.height() - hv.height() - footer.height();
	var w = container.width();

	var that = {

		init : function(){

			that.p = new Raphael(svg, w, h);
			that.line();

			var array = [
				"M0 "+(h*0.52)+"R"+(w*0.64)+" "+(h*0.49)+" "+w+" "+(h*0.04),
				"M0 "+(h*0.57)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
				"M0 "+(h*0.62)+"R"+(w*0.64)+" "+(h*0.59)+" "+w+" "+(h*0.16),
				"M0 "+(h*0.67)+"R"+(w*0.64)+" "+(h*0.64)+" "+w+" "+(h*0.22),
				"M0 "+(h*0.72)+"R"+(w*0.64)+" "+(h*0.69)+" "+w+" "+(h*0.28),
				"M0 "+(h*0.77)+"R"+(w*0.64)+" "+(h*0.74)+" "+w+" "+(h*0.34),
				"M0 "+(h*0.82)+"R"+(w*0.64)+" "+(h*0.79)+" "+w+" "+(h*0.40),
				"M0 "+(h*0.87)+"R"+(w*0.64)+" "+(h*0.84)+" "+w+" "+(h*0.46),
				"M0 "+(h*0.93)+"R"+(w*0.64)+" "+(h*0.90)+" "+w+" "+(h*0.52)
			];

			for (var i = 0; i < array.length; i++) {
				cratesPath.push(that.p.path(array[i]).attr({
					'stroke-opacity' : 0,
					'stroke-width'   : 1,
					'stroke'		 :'#c6c7c7'
				}));
			};

			for (var i = 0; i < cratesPath.length; i++) {
				var path = cratesPath[i];
				animate(path);
			};

			function animate(path){
				path.animate({ 'stroke-opacity' : 1 },5000,'backOut')	
			};

			return this;
		},
		resize : function(){

			var h =  body.height() - hv.height()  - footer.height();
			var w = container.width();

			$('#svg')
				.find('svg')
				.attr({
					'height' : h,
					'width'  : w
				});

		},

		svgChangeSize : function(){

			var h =  body.height() - hv.height()  - footer.height();
			var w = container.width();

			that.p.setSize(w, h);
		},

		line : function(){

			clearTimeout(timer);
			animate(0.11);
		
			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var array = [
					"M0 "+(h*0.52)+"R"+(w*0.64)+" "+(h*0.49)+" "+w+" "+(h*0.04),
					"M0 "+(h*0.57)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
					"M0 "+(h*0.62)+"R"+(w*0.64)+" "+(h*0.59)+" "+w+" "+(h*0.16),
					"M0 "+(h*0.67)+"R"+(w*0.64)+" "+(h*0.64)+" "+w+" "+(h*0.22),
					"M0 "+(h*0.72)+"R"+(w*0.64)+" "+(h*0.69)+" "+w+" "+(h*0.28),
					"M0 "+(h*0.77)+"R"+(w*0.64)+" "+(h*0.74)+" "+w+" "+(h*0.34),
					"M0 "+(h*0.82)+"R"+(w*0.64)+" "+(h*0.79)+" "+w+" "+(h*0.40),
					"M0 "+(h*0.87)+"R"+(w*0.64)+" "+(h*0.84)+" "+w+" "+(h*0.46),
					"M0 "+(h*0.93)+"R"+(w*0.64)+" "+(h*0.90)+" "+w+" "+(h*0.52)
				];

				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : array[i]
					},1000);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},1000);
				else
					that.svgChangeSize();
			}
		},
		one : function(){

			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var y  = 0.2 * Math.cos(angleoff) + 0.54;
				var y2 = 0.3 * Math.cos(angleoff) + 0.53;
				var x  = 0.1 * Math.sin(angleoff) + 0.5;

				var array = [
					"M0 "+(h*y2)+"R"+(w*x)+" "+((h+100) - 100)+" "+w+" "+(h*y),
					"M0 "+(h*y2 +40)+"R"+(w*x+20)+" "+((h+100) - 130)+" "+w+" "+(h*y+40),
					"M0 "+(h*y2+80)+"R"+(w*x+40)+" "+((h+100) - 160)+" "+w+" "+(h*y+80),
					"M0 "+(h*y2+120)+"R"+(w*x+60)+" "+((h+100) - 190)+" "+w+" "+(h*y+120),
					"M0 "+(h*y2+160)+"R"+(w*x+80)+" "+((h+100) - 220)+" "+w+" "+(h*y+160),
					"M0 "+(h*y2+200)+"R"+(w*x+100)+" "+((h+100) - 250)+" "+w+" "+(h*y+200),
					"M0 "+(h*y2+240)+"R"+(w*x+120)+" "+((h+100) - 280)+" "+w+" "+(h*y+240),
					"M0 "+(h*y2+280)+"R"+(w*x+140)+" "+((h+100) - 320)+" "+w+" "+(h*y+280),
					"M0 "+(h*y2+320)+"R"+(w*x+160)+" "+((h+100) - 350)+" "+w+" "+(h*y+320)
				];

				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : array[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
			
		},
		two : function(){

			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var y  = 0.01 * Math.sin(angleoff) + 0.85;
				var x  = 0.2 * Math.sin(angleoff) + 0.5;

				var lines = [
					"M0 "+(h)+"R"+(w*x)+" "+((h*y))+" "+(w-320)+" "+(0),
					"M40 "+(h)+"R"+(w*x)+" "+((h*y-40))+" "+(w-280)+" "+(0),
					"M80 "+(h)+"R"+(w*x)+" "+((h*y)-80)+" "+(w-240)+" "+(0),
					"M120 "+(h)+"R"+(w*x)+" "+((h*y)-120)+" "+(w-200)+" "+(0),
					"M160 "+(h)+"R"+(w*x)+" "+((h*y)-160)+" "+(w-160)+" "+(0),
					"M200 "+(h)+"R"+(w*x)+" "+((h*y)-200)+" "+(w-120)+" "+(0),
					"M240 "+(h)+"R"+(w*x)+" "+((h*y)-240)+" "+(w-80)+" "+(0),
					"M280 "+(h)+"R"+(w*x)+" "+((h*y)-280)+" "+(w-40)+" "+(0),
					"M320 "+(h)+"R"+(w*x)+" "+((h*y)-320)+" "+(w)+" "+(0)
				];

				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
		},
		three : function(){
			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var y  = 0.2 * Math.sin(angleoff) + 0.3;
				var x  = 0.1 * Math.sin(angleoff) + 0.5;

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
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
		},
		four : function(){
			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var x  = 0.2 * Math.cos(angleoff) + 0.6;
				var x  = 0.09 * Math.cos(angleoff) + 0.6;
				var y  = 0.2 * Math.cos(angleoff) + 0.4;
				var y2 = 0.2 * Math.sin(angleoff) + 0.6;
				var size = 0.5 * Math.sin(angleoff) + 30;

	
				var lines = [
					"M "+(w*0.6-60)+" "+(h)+"R"+(w*y+size)+" "+(h*y2-10)+" "+(w*0.6-60)+" "+(0),
					"M "+(w*0.6-120)+" "+(h)+"R"+(w*y+size * 2)+" "+(h*y2-20)+" "+(w*0.6-120)+" "+(0),
					"M "+(w*0.6-180)+" "+(h)+"R"+(w*y+size * 3)+" "+(h*y2-30)+" "+(w*0.6-180)+" "+(0),
					"M "+(w*0.6-240)+" "+(h)+"R"+(w*y+size * 4)+" "+(h*y2-40)+" "+(w*0.6-240)+" "+(0),
					"M "+(w*0.6-300)+" "+(h)+"R"+(w*y+size * 5)+" "+(h*y2-50)+" "+(w*0.6-300)+" "+(0),
					"M "+(w*0.6-360)+" "+(h)+"R"+(w*y+size * 6)+" "+(h*y2-60)+" "+(w*0.6-360)+" "+(0),
					"M "+(w*0.6-420)+" "+(h)+"R"+(w*y+size * 7)+" "+(h*y2-70)+" "+(w*0.6-420)+" "+(0),
					"M "+(w*0.6-480)+" "+(h)+"R"+(w*y+size * 8)+" "+(h*y2-80)+" "+(w*0.6-480)+" "+(0),
					"M "+(w*0.6-540)+" "+(h)+"R"+(w*y+size * 9)+" "+(h*y2-90)+" "+(w*0.6-540)+" "+(0)
				];

				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
		},
		five : function(){
			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var x  = 0.2 * Math.sin(angleoff) + 0.64;
				var y  = 0.05 * Math.sin(angleoff) + 0.52;
				var y2  = 0.2 * Math.sin(angleoff) + 0.6;
				var y3  = 0.2 * Math.sin(angleoff) + 0.05;

				var lines = [
					"M0 "+(h*y)+"R"+(w*x)+" "+(h*y2)+" "+w+" "+(h*y3),
					"M0 "+(h*y+40)+"R"+(w*x-20)+" "+(h*y2-20)+" "+w+" "+(h*y3+40),
					"M0 "+(h*y+80)+"R"+(w*x-40)+" "+(h*y2-40)+" "+w+" "+(h*y3+80),
					"M0 "+(h*y+120)+"R"+(w*x-80)+" "+(h*y2-60)+" "+w+" "+(h*y3+120),
					"M0 "+(h*y+160)+"R"+(w*x-100)+" "+(h*y2-80)+" "+w+" "+(h*y3+160),
					"M0 "+(h*y+200)+"R"+(w*x-120)+" "+(h*y2-100)+" "+w+" "+(h*y3+200),
					"M0 "+(h*y+240)+"R"+(w*x-140)+" "+(h*y2-120)+" "+w+" "+(h*y3+240),
					"M0 "+(h*y+280)+"R"+(w*x-160)+" "+(h*y2-140)+" "+w+" "+(h*y3+280),
					"M0 "+(h*y+320)+"R"+(w*x-180)+" "+(h*y2-160)+" "+w+" "+(h*y3+320)
				];
				
				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
		},
		six : function(){
			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();
			

				var x  = 0.1 * Math.cos(angleoff) + 0.6;
				var y  = 0.1 * Math.cos(angleoff) + 0.2;
				var y2  = 0.1 * Math.cos(angleoff) + 0.6;

				var lines = [
				    "M0 "+(h*y)+"R"+(w*x-20)+" "+(h*y2)+" "+w+" "+(h),
					"M0 "+(h*y+40)+"R"+(w*x-40)+" "+(h*y2-30)+" "+w+" "+(h+40),
					"M0 "+(h*y+80)+"R"+(w*x-60)+" "+(h*y2-60)+" "+w+" "+(h+80),
					"M0 "+(h*y+120)+"R"+(w*x-80)+" "+(h*y2-90)+" "+w+" "+(h+120),
					"M0 "+(h*y+160)+"R"+(w*x-100)+" "+(h*y2-120)+" "+w+" "+(h+160),
					"M0 "+(h*y+200)+"R"+(w*x-120)+" "+(h*y2-150)+" "+w+" "+(h+200),
					"M0 "+(h*y+240)+"R"+(w*x-140)+" "+(h*y2-180)+" "+w+" "+(h+240),
					"M0 "+(h*y+280)+"R"+(w*x-160)+" "+(h*y2-210)+" "+w+" "+(h+280),
					"M0 "+(h*y+320)+"R"+(w*x-180)+" "+(h*y2-240)+" "+w+" "+(h+320)
				];
				
				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}
		},
		seven : function(){
			clearTimeout(timer);
			animate(0.11);

			function animate(angleoffdelta){

				var h =  body.height() - hv.height()  - footer.height();
				var w = container.width();

				var x  = 0.1 * Math.cos(angleoff) + 0.6;
				var x2 = 0.2 * Math.cos(angleoff) + 0.8;
				var y  = 0.1 * Math.cos(angleoff) + 0.2;
				var y2  = 0.1 * Math.cos(angleoff) + 0.6;

				var lines = [
					"M0 "+(h*y)+"R"+(w*x-20)+" "+(h*y2)+" "+(w*x2)+" "+(h),
					"M0 "+(h*y+40)+"R"+(w*x-40)+" "+(h*y2-30)+" "+(w*x2-40)+" "+(h+40),
					"M0 "+(h*y+80)+"R"+(w*x-60)+" "+(h*y2-60)+" "+(w*x2-80)+" "+(h+80),
					"M0 "+(h*y+120)+"R"+(w*x-80)+" "+(h*y2-90)+" "+(w*x2-120)+" "+(h+120),
					"M0 "+(h*y+160)+"R"+(w*x-100)+" "+(h*y2-120)+" "+(w*x2-160)+" "+(h+160),
					"M0 "+(h*y+200)+"R"+(w*x-120)+" "+(h*y2-150)+" "+(w*x2-200)+" "+(h+200),
					"M0 "+(h*y+240)+"R"+(w*x-140)+" "+(h*y2-180)+" "+(w*x2-240)+" "+(h+240),
					"M0 "+(h*y+280)+"R"+(w*x-160)+" "+(h*y2-210)+" "+(w*x2-280)+" "+(h+280),
					"M0 "+(h*y+320)+"R"+(w*x-180)+" "+(h*y2-240)+" "+(w*x2-320)+" "+(h+320)
				];
				
				for (var i = 0; i < cratesPath.length; i++) {
					cratesPath[i].animate({
						path : lines[i]
					},500);
				};

				angleoff += angleoffdelta;
				if ( !( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) )
					timer = setTimeout(function(){animate(angleoffdelta)},500);
				else
					that.svgChangeSize();
			}

		}
	}	

	return that;

}