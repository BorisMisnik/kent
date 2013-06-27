var mobile = {

	init : function(){

		this.svg = document.getElementById('svg');

		var svg = this.svg
		  , w   = $('.xv').width()
		  , h   = $(window).height() - $('.xv').height();

		this.raphael = 	 new Raphael(svg, w, h);
		this.cratesPath = [];
		this.one();
		this.interval();
	},

	resize : function(){

		var h = $(window).height() - $('.xv').height();
		var w = $('.xv').width();
		$('svg').attr({
			'width' : w,
			'height' : h
		});
		
		this.raphael.setSize(w, h);
		this.animation(this.now);
	},

	interval: function(){
		setInterval( start, 5000 )
		var _this = this;

		function start(){
			var number = Math.floor( Math.random() * 7 );
			_this.animation(number);
		}

	},

	animation: function(number){
		switch ( number ){
			case 0:
				this.five();
				this.now = 0
				break;
			case 1:
				this.two();
				this.now = 1;
				break;
			case 2:
				this.three();
				this.now = 2;
				break;
			case 3:
				this.four();
				this.now = 3;
				break;
			case 4:
				this.five();
				this.now = 4;
				break;
			case 5:
				this.six();
				this.now = 5;
				break;
		}
	},

	one : function(){
		var _this = this;
		console.log('1');
		var w = $('.xv').width();
		var h =  $(window).height() - $('.xv').height();
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
			this.cratesPath.push( _this.raphael.path(array[i]).attr({
				'stroke-opacity' : 0,
				'stroke-width'   : 1,
				'stroke'		 :'#c6c7c7'
			}));
			animate(mobile.cratesPath[i]);
		};

		function animate(path){
			path.animate({ 'stroke-opacity' : 1 },5000,'backOut')	
		}

	},

	two : function(){
		console.log('2');
		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , y  = 0.2 * Math.cos(angleoff) + 0.54
		  , y2 = 0.3 * Math.cos(angleoff) + 0.53
		  , x  = 0.1 * Math.sin(angleoff) + 0.5

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

		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : array[i]
			},3000, 'backOut');
		};
	},

	three: function(){
		console.log('3');
		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , y  = 0.01 * Math.sin(angleoff) + 0.85
		  , x  = 0.2 * Math.sin(angleoff) + 0.5;

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

		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : lines[i]
			},3000, 'backOut');
		};
	},

	four: function(){
		console.log('4');
		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , y  = 0.2 * Math.sin(angleoff) + 0.3
		  , x  = 0.1 * Math.sin(angleoff) + 0.5;

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

		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : lines[i]
			},3000, 'backOut');
		};
	},

	five: function(){

		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , y  = 0.2 * Math.cos(angleoff) + 0.4
		  , x  = 0.09 * Math.cos(angleoff) + 0.6
		  , y2 = 0.2 * Math.sin(angleoff) + 0.6
		  , size = 0.5 * Math.sin(angleoff) + 30
	
		var lines = [
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

		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : lines[i]
			},3000, 'backOut');
		};
	},

	six: function(){
		console.log('6');
		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , x  = 0.2 * Math.sin(angleoff) + 0.64
		  , y  = 0.05 * Math.sin(angleoff) + 0.52
		  , y2  = 0.2 * Math.sin(angleoff) + 0.6
		  , y3  = 0.2 * Math.sin(angleoff) + 0.05

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
				
		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : lines[i]
			},3000, 'backOut');
		};
	},

	seven: function(){
		console.log('7');
		var h = $(window).height() - $('.xv').height()
		  , w = $('.xv').width()
		  , angleoff = 1.9
		  , x  = 0.1 * Math.cos(angleoff) + 0.6
		  , y  = 0.1 * Math.cos(angleoff) + 0.2
		  , y2  = 0.1 * Math.cos(angleoff) + 0.6

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
				
		for (var i = 0; i < this.cratesPath.length; i++) {
			this.cratesPath[i].animate({
				path : lines[i]
			},3000, 'backOut');
		};

	}

}

$(window).on({
	ready : function(){
		mobile.init();
	},
	resize: function(){
		mobile.resize();
	}
});
