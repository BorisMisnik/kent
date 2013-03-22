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
		"M0 "+(h*0.5)+"R"+(w*0.64)+" "+(h*0.54)+" "+w+" "+(h*0.1),
		"M0 "+(h*0.5+40)+"R"+(w*0.64)+" "+(h*0.54+40)+" "+w+" "+(h*0.1+40),
		"M0 "+(h*0.5+80)+"R"+(w*0.64)+" "+(h*0.54+80)+" "+w+" "+(h*0.1+80),
		"M0 "+(h*0.5+120)+"R"+(w*0.64)+" "+(h*0.54+120)+" "+w+" "+(h*0.1+120),
		"M0 "+(h*0.5+160)+"R"+(w*0.64)+" "+(h*0.54+160)+" "+w+" "+(h*0.1+160),
		"M0 "+(h*0.5+200)+"R"+(w*0.64)+" "+(h*0.54+200)+" "+w+" "+(h*0.1+200),
		"M0 "+(h*0.5+240)+"R"+(w*0.64)+" "+(h*0.54+240)+" "+w+" "+(h*0.1+240),
		"M0 "+(h*0.5+280)+"R"+(w*0.64)+" "+(h*0.54+280)+" "+w+" "+(h*0.1+280),
		"M0 "+(h*0.5+320)+"R"+(w*0.64)+" "+(h*0.54+320)+" "+w+" "+(h*0.1+320)
	];
	
	var pathes = [
		"M100 "+(h)+"R"+(0+400)+" "+(h*0.50)+" "+(300+100)+" "+(0),
		"M140 "+(h)+"R"+(0+380)+" "+(h*0.50 - 20)+" "+(300+140)+" "+(0),
		"M180 "+(h)+"R"+(0+360)+" "+(h*0.50 - 40)+" "+(300+180)+" "+(0),
		"M220 "+(h)+"R"+(0+340)+" "+(h*0.50 - 60)+" "+(300+220)+" "+(0),
		"M260 "+(h)+"R"+(0+320)+" "+(h*0.50 - 80)+" "+(300+260)+" "+(0),
		"M300 "+(h)+"R"+(0+300)+" "+(h*0.50 - 90)+" "+(300+300)+" "+(0),
		"M340 "+(h)+"R"+(0+280)+" "+(h*0.50 - 100)+" "+(300+340)+" "+(0),
		"M380 "+(h)+"R"+(0+260)+" "+(h*0.50 - 120)+" "+(300+380)+" "+(0),
		"M420 "+(h)+"R"+(0+240)+" "+(h*0.50 - 140)+" "+(300+420)+" "+(0)
	];

	var cratePath = [];
	var timer = 500;
	var j = 0;
	var g = 0;

	for (var i = 0; i < lines.length; i++) {
		cratePath.push(p.path(lines[i]).attr({
			'stroke':'#c6c7c7',
			'stroke-opacity':0.5,
			'stroke-width':1
		}));
		animateLine(cratePath[i])
	};

	function animateLine(path){
		setTimeout(function(){
			path.animate({
				'stroke-width':1,
				'stroke-opacity':1,
				'stroke':'#c6c7c7',
				'path' : pathes[g]
			},4000,'backOut');

			g++;
			if(g === pathes.length - 1){
				setTimeout(function(){
					animate(0.11);
					for (var i = 0; i < cratePath.length; i++) {
						cratePath[i].animate({
							'stroke-opacity' : 0
						},5000,'backOut',function(){
						})
					};
				},5000)
			}
		},timer)

		timer += 500;
	}

	var crateLine, crateLine1, crateLine2, crateLine3, crateLine4, crateLine5, crateLine6, crateLine7, crateLine8;
	var sin = 0.01;
	var cos = 0.05;
	var angleoff = 2.9;
	var ang = 1.9
	var i = 0;
	var marker = true;
	function animate(angleoffdelta){

		 var x  = cos * Math.cos(ang) + w ;
		 var x2 = cos * Math.cos(ang);
		 var y1 = sin * Math.cos(angleoff) + 0.5;
		 var y2 = sin * Math.sin(angleoff) + 0.6;
		 console.log()
	 
		 var newLine  = "M "+(w-x+100)+" "+(h)+"R"+(0+400)+" "+(h*y1)+" "+(300+100)+" "+(x2);
		 var newLine1 = "M "+(w-x+140)+" "+(h)+"R"+(0+380)+" "+(h*y1 - 20)+" "+(300+140)+" "+(x2);
		 var newLine2 = "M "+(w-x+180)+" "+(h)+"R"+(0+360)+" "+(h*y1 - 40)+" "+(300+180)+" "+(x2);
		 var newLine3 = "M "+(w-x+220)+" "+(h)+"R"+(0+340)+" "+(h*y1 - 60)+" "+(300+220)+" "+(x2);
		 var newLine4 = "M "+(w-x+260)+" "+(h)+"R"+(0+320)+" "+(h*y1 - 80)+" "+(300+260)+" "+(x2);
		 var newLine5 = "M "+(w-x+300)+" "+(h)+"R"+(0+300)+" "+(h*y1 - 90)+" "+(300+300)+" "+(x2);
		 var newLine6 = "M "+(w-x+340)+" "+(h)+"R"+(0+280)+" "+(h*y1 - 100)+" "+(300+340)+" "+(x2);
		 var newLine7 = "M "+(w-x+380)+" "+(h)+"R"+(0+260)+" "+(h*y1 - 120)+" "+(300+380)+" "+(x2);
		 var newLine8 = "M "+(w-x+420)+" "+(h)+"R"+(0+240)+" "+(h*y1 - 140)+" "+(300+420)+" "+(x2);

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
		 
		 setTimeout(function(){animate(angleoffdelta)},50);
	}
});