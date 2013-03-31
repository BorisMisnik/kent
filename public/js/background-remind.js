$(function(){
	var raphael = background();
	raphael.crateCanvas()
		   .firstBackground();
    
	$('input, textarea').focus(function(){
    	raphael.w = $('.container-fluid').width();
		raphael.h = $('.container-fluid').height()-$('.xv').height()-$('.footer').height();

		raphael.p.setSize(raphael.w,raphael.h); 
    });	   
	$(window).resize(function(){

		raphael.w = $('.container-fluid').width();
		raphael.h = $('.container-fluid').height()-$('.xv').height()-$('.footer').height();

		raphael.p.setSize(raphael.w,raphael.h); 
	});
	function background(){
		var that = {};

		that.w = $('.container-fluid').width();
		that.h =  $('.container-fluid').height()-$('.xv').height()-$('.footer').height();

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
				cratesPath.push(this.p.path(lines[i]).attr({'stroke':'#c6c7c7','stroke-opacity':0.2}));
			};

			return this;
		};

		that.firstBackground = function(){
			clearTimeout(timer);
			var p = that.p;

			var h = that.h;
			var w = that.w;

			 var x  = cos * Math.cos(angleoff) + 2;
			 var y1 = sin * Math.cos(angleoff) + 0.5;
			 var y2 = sin * Math.sin(angleoff) + 0.6;

			var lines = [
				"M0 "+(h*y1)+"R"+(w/x-20)+" "+(h*y2)+" "+(w)+" "+(h),
				"M0 "+(h*y1-40)+"R"+(w/x-40)+" "+(h*y2+20)+" "+(w)+" "+(h-20),
				"M0 "+(h*y1-80)+"R"+(w/x-60)+" "+(h*y2+40)+" "+(w)+" "+(h-40),
				"M0 "+(h*y1-120)+"R"+(w/x-80)+" "+(h*y2+60)+" "+(w)+" "+(h-60),
				"M0 "+(h*y1-160)+"R"+(w/x-100)+" "+(h*y2+80)+" "+(w)+" "+(h-80),
				"M0 "+(h*y1-200)+"R"+(w/x-120)+" "+(h*y2+100)+" "+(w)+" "+(h-100),
				"M0 "+(h*y1-240)+"R"+(w/x-140)+" "+(h*y2+120)+" "+(w)+" "+(h-120),
				"M0 "+(h*y1-280)+"R"+(w/x-160)+" "+(h*y2+140)+" "+(w)+" "+(h-140),
				"M0 "+(h*y1-320)+"R"+(w/x-180)+" "+(h*y2+160)+" "+(w)+" "+(h-160)
			];

			for (var i = 0; i < cratesPath.length; i++) {
				cratesPath[i].animate({
					path : lines[i],
					'stroke-opacity' : '1'
				},2000,'cubic-bezier(.39,.58,.56,1)');
			};

			// setTimeout(function(){
			// 	animate(0.11)
			// },2000);
			animate(0.11)
			function animate(angleoffdelta){

				var h = that.h;
				var w = that.w;

				
				 var x  = 0.2 * Math.cos(angleoff) + 2;
				 var y1 = 0.2 * Math.cos(angleoff) + 0.5;
				 var y2 = 0.2 * Math.sin(angleoff) + 0.6;

				var lines = [
					"M0 "+(h*y1)+"R"+(w/x-20)+" "+(h*y2)+" "+(w)+" "+(h),
					"M0 "+(h*y1-40)+"R"+(w/x-40)+" "+(h*y2+20)+" "+(w)+" "+(h-20),
					"M0 "+(h*y1-80)+"R"+(w/x-60)+" "+(h*y2+40)+" "+(w)+" "+(h-40),
					"M0 "+(h*y1-120)+"R"+(w/x-80)+" "+(h*y2+60)+" "+(w)+" "+(h-60),
					"M0 "+(h*y1-160)+"R"+(w/x-100)+" "+(h*y2+80)+" "+(w)+" "+(h-80),
					"M0 "+(h*y1-200)+"R"+(w/x-120)+" "+(h*y2+100)+" "+(w)+" "+(h-100),
					"M0 "+(h*y1-240)+"R"+(w/x-140)+" "+(h*y2+120)+" "+(w)+" "+(h-120),
					"M0 "+(h*y1-280)+"R"+(w/x-160)+" "+(h*y2+140)+" "+(w)+" "+(h-140),
					"M0 "+(h*y1-320)+"R"+(w/x-180)+" "+(h*y2+160)+" "+(w)+" "+(h-160)
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
});