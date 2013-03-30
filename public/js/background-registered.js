$(function(){
	var raphael = background();
	raphael.crateCanvas()
		   .firstBackground();

    $('input').focus(function(){
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
		that.h = $('.container-fluid').height()-$('.xv').height()-$('.footer').height();

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

			var y  = 0.01 * Math.sin(angleoff) + 0.86;
			var x  = cos * Math.sin(angleoff) + 0.5;

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
					path : lines[i],
					'stroke-opacity' : 1
				},1100,'cubic-bezier(.39,.58,.56,1)');

				if(i===cratesPath.length-1){
					animate(0.11);
				}
			};

			function animate(angleoffdelta){

				var h = that.h;
				var w = that.w;

				var y  = 0.3 * Math.sin(angleoff) + 0.85;
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
				timer = setTimeout(function(){animate(angleoffdelta)},500);
			};
			return this;
		};
		return that; 
	}
});