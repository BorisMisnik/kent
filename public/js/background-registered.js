$(function(){
	var svg = $('#svg');
	var w 	= svg.width();
	var h 	= svg.height();
	var p = new Raphael(document.getElementById('svg'),w,h);

	$(window).resize(function(){
		w = svg.width();
		h = svg.height();
		p.setSize(w,h);
	});


	var lines = [
		"M0 "+(h*0.57)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
		"M0 "+(h*0.57+40)+"R"+(w*0.64)+" "+(h*0.59)+" "+w+" "+(h*0.16),
		"M0 "+(h*0.57+80)+"R"+(w*0.64)+" "+(h*0.64)+" "+w+" "+(h*0.22),
		"M0 "+(h*0.57+120)+"R"+(w*0.64)+" "+(h*0.69)+" "+w+" "+(h*0.28),
		"M0 "+(h*0.57+160)+"R"+(w*0.64)+" "+(h*0.74)+" "+w+" "+(h*0.34),
		"M0 "+(h*0.57+200)+"R"+(w*0.64)+" "+(h*0.79)+" "+w+" "+(h*0.40),
		"M0 "+(h*0.57+240)+"R"+(w*0.64)+" "+(h*0.84)+" "+w+" "+(h*0.46),
		"M0 "+(h*0.57+280)+"R"+(w*0.64)+" "+(h*0.90)+" "+w+" "+(h*0.52),
		"M0 "+(h*0.57+320)+"R"+(w*0.64)+" "+(h*0.95)+" "+w+" "+(h*0.58)
	];

	var pathes = [
		 "M "+(w*0.9-20)+" "+(h)+"R"+(w*0.8+20)+" "+(h*0.6-30)+" "+(w*0.9-20)+" "+(0),
		 "M "+(w*0.9-40)+" "+(h)+"R"+(w*0.8+40)+" "+(h*0.6-60)+" "+(w*0.9-40)+" "+(0),
		 "M "+(w*0.9-60)+" "+(h)+"R"+(w*0.8+60)+" "+(h*0.6-90)+" "+(w*0.9-60)+" "+(0),
		 "M "+(w*0.9-80)+" "+(h)+"R"+(w*0.8+80)+" "+(h*0.6-120)+" "+(w*0.9-80)+" "+(0),
		 "M "+(w*0.9-100)+" "+(h)+"R"+(w*0.8+100)+" "+(h*0.6-150)+" "+(w*0.9-100)+" "+(0),
		 "M "+(w*0.9-120)+" "+(h)+"R"+(w*0.8+120)+" "+(h*0.6-180)+" "+(w*0.9-120)+" "+(0),
		 "M "+(w*0.9-140)+" "+(h)+"R"+(w*0.8+140)+" "+(h*0.6-220)+" "+(w*0.9-140)+" "+(0),
		 "M "+(w*0.9-160)+" "+(h)+"R"+(w*0.8+160)+" "+(h*0.6-250)+" "+(w*0.9-160)+" "+(0),
		 "M "+(w*0.9-180)+" "+(h)+"R"+(w*0.8+180)+" "+(h*0.6-280)+" "+(w*0.9-180)+" "+(0)
	];

	var cratePath = [];
	var timer = 500;
	var j = 0;
	var g = 0;

	for (var i = 0; i < lines.length; i++) {
		cratePath.push(p.path(lines[i]).attr({
			'stroke':'#c6c7c7',
			'stroke-opacity':0,
			'stroke-width':3
		}));
		animateLine(cratePath[i])
	};

	function animateLine(path){
		setTimeout(function(){
			path.animate({
				'stroke-width':1,
				'stroke-opacity':1,
				'path' : pathes[g]
			},4000,'backOut');

			g++;
			if(g === pathes.length - 1){
				setTimeout(function(){
					animate(0.03);
					for (var i = 0; i < cratePath.length; i++) {
						cratePath[i].animate({
							'stroke-opacity' : 0
						},5000,'backOut')
					};
				},5000)
			}
		},timer)

		timer += 500;
	}

	var crateLine, crateLine1, crateLine2, crateLine3, crateLine4, crateLine5, crateLine6, crateLine7, crateLine8;
	var sin = 0.01;
	var cos = 0.05;
	var angleoff = 1.9;
	var ang = 1.9
	var i = 0;
	var marker = true;
	function animate(angleoffdelta){

		 var x  = cos * Math.cos(ang) + 0.9;
		 var y  = sin * Math.cos(angleoff) + 0.8;

	 
		 var newLine  = "M "+(w*x-20)+" "+(h)+"R"+(w*y+20)+" "+(h*0.6-30)+" "+(w*x-20)+" "+(0);
		 var newLine1 = "M "+(w*x-40)+" "+(h)+"R"+(w*y+40)+" "+(h*0.6-60)+" "+(w*x-40)+" "+(0);
		 var newLine2 = "M "+(w*x-60)+" "+(h)+"R"+(w*y+60)+" "+(h*0.6-90)+" "+(w*x-60)+" "+(0);
		 var newLine3 = "M "+(w*x-80)+" "+(h)+"R"+(w*y+80)+" "+(h*0.6-120)+" "+(w*x-80)+" "+(0);
		 var newLine4 = "M "+(w*x-100)+" "+(h)+"R"+(w*y+100)+" "+(h*0.6-150)+" "+(w*x-100)+" "+(0);
		 var newLine5 = "M "+(w*x-120)+" "+(h)+"R"+(w*y+120)+" "+(h*0.6-180)+" "+(w*x-120)+" "+(0);
		 var newLine6 = "M "+(w*x-140)+" "+(h)+"R"+(w*y+140)+" "+(h*0.6-220)+" "+(w*x-140)+" "+(0);
		 var newLine7 = "M "+(w*x-160)+" "+(h)+"R"+(w*y+160)+" "+(h*0.6-250)+" "+(w*x-160)+" "+(0);
		 var newLine8 = "M "+(w*x-180)+" "+(h)+"R"+(w*y+180)+" "+(h*0.6-280)+" "+(w*x-180)+" "+(0);

		 if(crateLine != undefined) crateLine.remove();
		 crateLine = p.path(newLine).attr('stroke','#c6c7c7');

		 if(crateLine1 != undefined) crateLine1.remove();
		 crateLine1 = p.path(newLine1).attr('stroke','#c6c7c7');

		 if(crateLine2 != undefined) crateLine2.remove();
		 crateLine2 = p.path(newLine2).attr('stroke','#c6c7c7');

		 if(crateLine3 != undefined) crateLine3.remove();
		 crateLine3 = p.path(newLine3).attr('stroke','#c6c7c7');

		 if(crateLine4 != undefined) crateLine4.remove();
		 crateLine4 = p.path(newLine4).attr('stroke','#c6c7c7');

		  if(crateLine5 != undefined) crateLine5.remove();
		 crateLine5 = p.path(newLine5).attr('stroke','#c6c7c7');

		  if(crateLine6 != undefined) crateLine6.remove();
		 crateLine6 = p.path(newLine6).attr('stroke','#c6c7c7');

		  if(crateLine7 != undefined) crateLine7.remove();
		 crateLine7 = p.path(newLine7).attr('stroke','#c6c7c7');

		  if(crateLine8 != undefined) crateLine8.remove();
		 crateLine8 = p.path(newLine8).attr('stroke','#c6c7c7');


		 angleoff += angleoffdelta;
		 ang += angleoffdelta;
		 if(angleoffdelta <= 0) return;
		 
		 setTimeout(function(){animate(angleoffdelta)},60);
	}
});