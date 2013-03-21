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
		"M0 "+(h*0.54)+"R"+0+" "+(h*0.54)+" "+0+" "+(h*0.54),
		"M0 "+(h*0.54 + 40)+"R"+0+" "+(h*0.54 + 40)+" "+0+" "+(h*0.54 + 40),
		"M0 "+(h*0.54 + 80)+"R"+0+" "+(h*0.54 + 80)+" "+0+" "+(h*0.54 + 80),
		"M0 "+(h*0.54 + 120)+"R"+0+" "+(h*0.54 + 120)+" "+0+" "+(h*0.54 + 120),
		"M0 "+(h*0.54 + 160)+"R"+0+" "+(h*0.54 + 160)+" "+0+" "+(h*0.54 + 160),
		"M0 "+(h*0.54 + 200)+"R"+0+" "+(h*0.54 + 200)+" "+0+" "+(h*0.54 + 200),
		"M0 "+(h*0.54 + 240)+"R"+0+" "+(h*0.54 + 240)+" "+0+" "+(h*0.54 + 240),
		"M0 "+(h*0.54 + 280)+"R"+0+" "+(h*0.54 + 280)+" "+0+" "+(h*0.54 + 280),
		"M0 "+(h*0.54 + 320)+"R"+0+" "+(h*0.54 + 320)+" "+0+" "+(h*0.54 + 320)
	];

	var pathes = [
		"M0 "+(h*0.54)+"R"+(w*0.5)+" "+(h*0.54)+" "+w+" "+(h*0.54),
		"M0 "+(h*0.54 + 40)+"R"+(w*0.5)+" "+(h*0.54 + 40)+" "+w+" "+(h*0.54 + 40),
		"M0 "+(h*0.54 + 80)+"R"+(w*0.5)+" "+(h*0.54 + 80)+" "+w+" "+(h*0.54 + 80),
		"M0 "+(h*0.54 + 120)+"R"+(w*0.5)+" "+(h*0.54 + 120)+" "+w+" "+(h*0.54 + 120),
		"M0 "+(h*0.54 + 160)+"R"+(w*0.5)+" "+(h*0.54 + 160)+" "+w+" "+(h*0.54 + 160),
		"M0 "+(h*0.54 + 200)+"R"+(w*0.5)+" "+(h*0.54 + 200)+" "+w+" "+(h*0.54 + 200),
		"M0 "+(h*0.54 + 240)+"R"+(w*0.5)+" "+(h*0.54 + 240)+" "+w+" "+(h*0.54 + 240),
		"M0 "+(h*0.54 + 280)+"R"+(w*0.5)+" "+(h*0.54 + 280)+" "+w+" "+(h*0.54 + 280),
		"M0 "+(h*0.54 + 320)+"R"+(w*0.5)+" "+(h*0.54 + 320)+" "+w+" "+(h*0.54 + 320)
	];

	var pathesTwo = [
		"M0 "+(h*0.54)+"R"+(w*0.5)+" "+((h+100) - 100)+" "+w+" "+(h*0.54),
		"M0 "+(h*0.54 + 40)+"R"+(w*0.5 + 20)+" "+((h+100)-130)+" "+w+" "+(h*0.54 + 40),
		"M0 "+(h*0.54 + 80)+"R"+(w*0.5 + 40)+" "+((h+100)-160)+" "+w+" "+(h*0.54 + 80),
		"M0 "+(h*0.54 + 120)+"R"+(w*0.5 + 60)+" "+((h+100)-190)+" "+w+" "+(h*0.54 + 120),
		"M0 "+(h*0.54 + 160)+"R"+(w*0.5 + 80)+" "+((h+100)-220)+" "+w+" "+(h*0.54 + 160),
		"M0 "+(h*0.54 + 200)+"R"+(w*0.5 + 100)+" "+((h+100)-250)+" "+w+" "+(h*0.54 + 200),
		"M0 "+(h*0.54 + 240)+"R"+(w*0.5 + 120)+" "+((h+100)-280)+" "+w+" "+(h*0.54 + 240),
		"M0 "+(h*0.54 + 280)+"R"+(w*0.5 + 140)+" "+((h+100)-310)+" "+w+" "+(h*0.54 + 280),
		"M0 "+(h*0.54 + 320)+"R"+(w*0.5 + 160)+" "+((h+100)-340)+" "+w+" "+(h*0.54 + 320)
	];

	var cratePath = [];
	var timer = 500;
	var j = 0;
	var g = 0;

	for (var i = 0; i < lines.length; i++) {
		cratePath.push(p.path(lines[i]).attr({'stroke':'#c6c7c7'}));
		animateLine(cratePath[i]);
	};

	function animateLine(path){
		setTimeout(function(){
			path.animate({
				'path' : pathes[j]
			},2000,'bounce',function(){
				console.log(pathesTwo[g])
				this.animate({
					path : pathesTwo[g]
				},2000,'bounce',function(){
					if(j === cratePath.length - 1 && g === pathesTwo.length - 1){
						setTimeout(function(){
							for (var i = 0; i < cratePath.length; i++) {
								cratePath[i].animate({
									// 'stroke-opacity' : 0.5
								},1000)
							};
							setTimeout(function(){animate(0.08)},200)
						},4000)
					}	
				});
				g++;

			});

			if(j < pathes.length-1) j++;
			
		},timer)
		timer += 500;
	}

	var crateLine, crateLine1, crateLine2, crateLine3, crateLine4, crateLine5, crateLine6, crateLine7, crateLine8, crateLine9;
	var sin = 0.01;
	var cos = 0.005;
	var angleoff = 1.9;
	var ang = 1.9
	var i = 0;
	var marker = true;
	function animate(angleoffdelta){

		 var y  = sin * Math.cos(angleoff) + 0.54;
		 var x  = cos * Math.sin(ang) + 0.5;
		 var y2 = sin * Math.cos(angleoff) + 0.53;

		 if(marker){
			 for (var i = 0; i < cratePath.length; i++) {
				cratePath[i].animate({
						'stroke-opacity' : 0
					},1000,function(){
						this.remove();
					})
			};
			marker = false;
		 }
		 
		 var newLine =  "M0 "+(h*y2)+"R"+(w*x)+" "+((h+100) - 100)+" "+w+" "+(h*y);
		 var newLine1 = "M0 "+(h*y2 +40)+"R"+(w*x + 20)+" "+((h+100) - 130)+" "+w+" "+(h*y+40);
		 var newLine2 = "M0 "+(h*y2+80)+"R"+(w*x + 40)+" "+((h+100) - 160)+" "+w+" "+(h*y+80);
		 var newLine3 = "M0 "+(h*y2+120)+"R"+(w*x + 60)+" "+((h+100) - 190)+" "+w+" "+(h*y+120);
		 var newLine4 = "M0 "+(h*y2+160)+"R"+(w*x + 80)+" "+((h+100) - 220)+" "+w+" "+(h*y+160);
		 var newLine5 = "M0 "+(h*y2+200)+"R"+(w*x + 100)+" "+((h+100) - 250)+" "+w+" "+(h*y+200);
		 var newLine6 = "M0 "+(h*y2+240)+"R"+(w*x + 120)+" "+((h+100) - 280)+" "+w+" "+(h*y+240);
		 var newLine7 = "M0 "+(h*y2+280)+"R"+(w*x + 140)+" "+((h+100) - 320)+" "+w+" "+(h*y+280);
		 var newLine8 = "M0 "+(h*y2+320)+"R"+(w*x + 160)+" "+((h+100) - 350)+" "+w+" "+(h*y+320);

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