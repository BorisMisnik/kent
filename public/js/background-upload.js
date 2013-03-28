$(function(){
	var raphael = background();
	raphael.crateCanvas()
		   .firstBackground();

	$(window).resize(function(){

		raphael.w = $('.container-fluid').width();
		raphael.h = $('.main').height() + 30;

		raphael.p.setSize(raphael.w,raphael.h); 
	});
	function background(){
		var that = {};

		that.w = $('.container-fluid').width();
		that.h = $('.main').height() + 30;

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

			 var x  = 0.2 * Math.cos(angleoff) + w;
			 var x2 = 0.2 * Math.cos(angleoff);
			 var y1 = 0.2 * Math.cos(angleoff) + 0.5;
			 var y2 = 0.2 * Math.sin(angleoff) + 0.6;
			 
			var lines = [
				"M "+(w-x+100)+" "+(h)+"R"+(0+400)+" "+(h*y1)+" "+(300+100)+" "+(x2),
				"M "+(w-x+140)+" "+(h)+"R"+(0+380)+" "+(h*y1 - 20)+" "+(300+140)+" "+(x2),
				"M "+(w-x+180)+" "+(h)+"R"+(0+360)+" "+(h*y1 - 40)+" "+(300+180)+" "+(x2),
				"M "+(w-x+220)+" "+(h)+"R"+(0+340)+" "+(h*y1 - 60)+" "+(300+220)+" "+(x2),
				"M "+(w-x+260)+" "+(h)+"R"+(0+320)+" "+(h*y1 - 80)+" "+(300+260)+" "+(x2),
				"M "+(w-x+300)+" "+(h)+"R"+(0+300)+" "+(h*y1 - 90)+" "+(300+300)+" "+(x2),
				"M "+(w-x+340)+" "+(h)+"R"+(0+280)+" "+(h*y1 - 100)+" "+(300+340)+" "+(x2),
				"M "+(w-x+380)+" "+(h)+"R"+(0+260)+" "+(h*y1 - 120)+" "+(300+380)+" "+(x2),
				"M "+(w-x+420)+" "+(h)+"R"+(0+240)+" "+(h*y1 - 140)+" "+(300+420)+" "+(x2)
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

				 var x  = 0.2 * Math.cos(angleoff) + w;
				 var x2 = 0.2 * Math.cos(angleoff);
				 var y1 = 0.2 * Math.cos(angleoff) + 0.5;
				 var y2 = 0.2 * Math.sin(angleoff) + 0.6;
		
				var lines = [
					"M "+(w-x+100)+" "+(h)+"R"+(0+400)+" "+(h*y1)+" "+(300+100)+" "+(x2),
					"M "+(w-x+140)+" "+(h)+"R"+(0+380)+" "+(h*y1 - 20)+" "+(300+140)+" "+(x2),
					"M "+(w-x+180)+" "+(h)+"R"+(0+360)+" "+(h*y1 - 40)+" "+(300+180)+" "+(x2),
					"M "+(w-x+220)+" "+(h)+"R"+(0+340)+" "+(h*y1 - 60)+" "+(300+220)+" "+(x2),
					"M "+(w-x+260)+" "+(h)+"R"+(0+320)+" "+(h*y1 - 80)+" "+(300+260)+" "+(x2),
					"M "+(w-x+300)+" "+(h)+"R"+(0+300)+" "+(h*y1 - 90)+" "+(300+300)+" "+(x2),
					"M "+(w-x+340)+" "+(h)+"R"+(0+280)+" "+(h*y1 - 100)+" "+(300+340)+" "+(x2),
					"M "+(w-x+380)+" "+(h)+"R"+(0+260)+" "+(h*y1 - 120)+" "+(300+380)+" "+(x2),
					"M "+(w-x+420)+" "+(h)+"R"+(0+240)+" "+(h*y1 - 140)+" "+(300+420)+" "+(x2)
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