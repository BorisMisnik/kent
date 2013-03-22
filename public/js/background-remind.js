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
		"M0 "+(h*0.5)+"R"+(w/2-20)+" "+(h*0.6)+" "+(w)+" "+(h),
		"M0 "+(h*0.5-40)+"R"+(w/2-40)+" "+(h*0.6+20)+" "+(w)+" "+(h-20),
		"M0 "+(h*0.5-80)+"R"+(w/2-60)+" "+(h*0.6+40)+" "+(w)+" "+(h-40),
		"M0 "+(h*0.5-120)+"R"+(w/2-80)+" "+(h*0.6+60)+" "+(w)+" "+(h-60),
		"M0 "+(h*0.5-160)+"R"+(w/2-100)+" "+(h*0.6+80)+" "+(w)+" "+(h-80),
		"M0 "+(h*0.5-200)+"R"+(w/2-120)+" "+(h*0.6+100)+" "+(w)+" "+(h-100),
		"M0 "+(h*0.5-240)+"R"+(w/2-140)+" "+(h*0.6+120)+" "+(w)+" "+(h-120),
		"M0 "+(h*0.5-280)+"R"+(w/2-160)+" "+(h*0.6+140)+" "+(w)+" "+(h-140),
		"M0 "+(h*0.5-320)+"R"+(w/2-180)+" "+(h*0.6+160)+" "+(w)+" "+(h-160)
	];

	var cratePath = [];
	var timer = 500;
	var j = 0;
	var g = 0;

	for (var i = 0; i < lines.length; i++) {
		cratePath.push(p.path(lines[i]).attr({
			'stroke':'#c6c7c7',
			'stroke-opacity':0.5,
			'stroke-width':0.5
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
					animate(0.05);
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
	var angleoff = 1.9;
	var ang = 1.9
	var i = 0;
	var marker = true;
	function animate(angleoffdelta){

		 var x  = cos * Math.cos(ang) + 2;
		 var y1 = sin * Math.cos(angleoff) + 0.5;
		 var y2 = sin * Math.sin(angleoff) + 0.6;

	 
		 var newLine  = "M0 "+(h*y1)+"R"+(w/x-20)+" "+(h*y2)+" "+(w)+" "+(h);
		 var newLine1 = "M0 "+(h*y1-40)+"R"+(w/x-40)+" "+(h*y2+20)+" "+(w)+" "+(h-20);
		 var newLine2 = "M0 "+(h*y1-80)+"R"+(w/x-60)+" "+(h*y2+40)+" "+(w)+" "+(h-40);
		 var newLine3 = "M0 "+(h*y1-120)+"R"+(w/x-80)+" "+(h*y2+60)+" "+(w)+" "+(h-60);
		 var newLine4 = "M0 "+(h*y1-160)+"R"+(w/x-100)+" "+(h*y2+80)+" "+(w)+" "+(h-80);
		 var newLine5 = "M0 "+(h*y1-200)+"R"+(w/x-120)+" "+(h*y2+100)+" "+(w)+" "+(h-100);
		 var newLine6 = "M0 "+(h*y1-240)+"R"+(w/x-140)+" "+(h*y2+120)+" "+(w)+" "+(h-120);
		 var newLine7 = "M0 "+(h*y1-280)+"R"+(w/x-160)+" "+(h*y2+140)+" "+(w)+" "+(h-140);
		 var newLine8 = "M0 "+(h*y1-320)+"R"+(w/x-180)+" "+(h*y2+160)+" "+(w)+" "+(h-160);

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