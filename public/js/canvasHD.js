(function(){
	if( $.browser.msie  && parseInt($.browser.version, 10) === 8 ) return;
	var app = {
		update : false,
		frames : [],
		one : false,
		two : false,
		three : false,
		section : $('#newHD'),
		scrollImg : $('#newHD .arrow-wrapper'),
		mobileArrow : $('.hiddenArrow'),
		preload : function(){  // upload all images

			var preload = new createjs.LoadQueue(false);
			var _this = this;

			this.manifest = []; // list all images
			this.canvas = document.getElementById('canvasHD'); // hide canvas
			this.canvas.style.display = 'none'
			this.preloader = document.getElementsByClassName('preloader')[0]; // preloader

			preload.addEventListener('progress', handleOverallProgress);
			preload.addEventListener('complete', handleComplete);
			// fill manifets
			var n = 0; // 
			for (var i = 0; i <= 50 ; i++) {	// rotate 0-50
				this.manifest.push(this.nameImage(i));	
				this.frames.push([0, 0, 1000, 600, n, 0, 0]);
				n++;
			};
			for (var i = 51; i <= 101 ; i++) { // opening 51-101
				this.manifest.push(this.nameImage(i));
				this.frames.push([0, 0, 1000, 600, i, 0, 0]);
				preload.loadFile(this.manifest[i]);
			};
			for (var i = 102; i <= 127 ; i++) { // cig 102-127
				this.manifest.push(this.nameImage(i));
				this.frames.push([0, 0, 1000, 600, i, 0, 0]);
				preload.loadFile(this.manifest[i]);
			};
			for (var i = 128; i <= 299 ; i++) { // filter 128-299
				this.manifest.push(this.nameImage(i));
				this.frames.push([0, 0, 1000, 600, i, 0, 0]);
				preload.loadFile(this.manifest[i]);
			};
			function handleOverallProgress(event){ // allProgress images upload
				_this.preloader.innerHTML = Math.floor(preload.progress * 100) + '%';  
			};
			function handleComplete(){ // upload complete
				var marker = true;
				window.stopScrollAll = true; // disable scroll
				_this.scrollImg.hide();
				// show canvas
				_this.preloader.style.display = 'none';
				_this.canvas.style.display = 'block';
				_this.crateStage(); // init stage
			};

		},
		nameImage : function(i){
			var zero = ( i < 10 ) ? '000' : ( i >= 10 && i < 100 ) ? '00' : '0'; // crate name image
			var name = '/img/hd/KENT_HD' + zero + '' + i + '.png';
			return name;
		},
		crateStage : function(){
			this.stage = new createjs.Stage(this.canvas); // init stage
			this.stage.enableMouseOver(19);
			this.stage.mouseMoveOutside = true;
			createjs.Touch.enable(this.stage);
			this.crateOldHd(); // 
			this.crateImages(); // crate sprites
			this.crateTitle(); // crate Title

			createjs.Ticker.setFPS(20);
			createjs.Ticker.addEventListener('tick', app.tick.bind(app));
		},
		crateOldHd : function(){
			var oldHD = this.oldHD = new createjs.Bitmap("img/old_hd.png"); 
			var x = 1000/2 - 171/2;
			var count = 0;
			var _this = this;
			oldHD.x = 1000/2 - 171/2;
			oldHD.y = (600/2 - 265/2) - 40;
			oldHD.scaleX = 1;
			oldHD.scaleY = 1;
			this.stage.addChild(oldHD);

			var tween = this.tween = createjs.Tween 
					.get(oldHD, {loop : true})
					.to({x : x-2}, 50)
					.to({x : x}, 50)
					.to({x : x + 2}, 50)
					.to({x : x - 2}, 50)
					.call(function(){
						count++;
						if( count >= 15 ){
							tween.setPaused(true);
							_this.showNewHD();
						}
					})

			var light = this.light = new createjs.Bitmap("img/light.png");
			var scale = 1;
			light.scaleX = scale;
			light.scaleY = scale;
			light.x = 1000/2 -(864*scale)/2;
			light.y = 600/2 - (600*scale)/2;
			light.y = 0;
			light.alpha = 0;
			this.stage.addChild(light);
		},
		showNewHD : function(){
			var _this = this;
			createjs.Tween 
				.get(this.oldHD)
				.to({alpha : 0}, 2000, Ease.getElasticIn)
				.call(stopInterval);

			createjs.Tween 
				.get(this.light)
				.to({alpha : 1}, 2000, Ease.getElasticIn)
				.call(showNewHd);
				
			function stopInterval(){
				_this.tween.setPaused(true);
				clearInterval(_this.timer_1);
				clearInterval(_this.timer_2);
			}	

			function showNewHd(){
				createjs.Tween 
					.get(_this.light)
					.to({alpha : 0}, 1500, Ease.getElasticIn);

				createjs.Tween 
					.get(app.img)
					.to({alpha : 1}, 1500, Ease.getElasticIn)
					.call(runAnimation);
			};

			function runAnimation(){
				var marker = true;
				_this.topText.text = 'Новий та сучасний дизайн KENT HD'.toUpperCase();
				_this.topText.x = 1000/2 - _this.topText.getMeasuredWidth()/2;
				createjs.Ticker.setFPS(10);
				_this.img.gotoAndPlay('rotate');
				_this.section.off();
				_this.mobileArrow.off();
			}

		},
		crateImages : function(){
			var _this = this;
			var scale=.6;
			var ss = new createjs.SpriteSheet({ // crate Sprite Sheet
				images : _this.manifest,
				frames : _this.frames,
				animations : {
					rotate : [0, 50],
					open : [51,101],
					sigaret : [102,127],
					filter : [127,180],
					filterOne : [181, 220],
					filterTwo : [220, 260],
					filterThree : [260, 299]
				}
			});
			
			var img = this.img = new createjs.BitmapAnimation(ss); // crate new SpriteSheet animation
			ss.getAnimation('open').next = 'sigaret';
			ss.getAnimation('sigaret').next = 'filter';
			ss.getAnimation('filter').next = 'filterOne';
			ss.getAnimation('filterOne').next = 'filterTwo';
			ss.getAnimation('filterTwo').next = 'filterThree';
			// aline center
			img.scaleX = scale;
			img.scaleY = scale;
			img.alpha = 0;
			img.x = 1000/2 - (1000*scale)/2;
			img.y = (600/2 - (600*scale)/2) - 55;

			img.addEventListener('animationend', this.animation.bind(this));
		    // add img to stage
			this.stage.addChild(img);	
		},
		crateTitle : function(){
			var topText = this.topText = new createjs.Text("Зустрічай оновлення КЕНТ HD".toUpperCase(), "28px Verdana", "#5d6870");
			topText.x = 1000/2 - topText.getMeasuredWidth()/2;
			topText.y = 45;
			var bottomText = this.bottomText = new createjs.Text("".toUpperCase(), "28px Verdana", "#5d6870");
			bottomText.x = 1000/2 - bottomText.getMeasuredWidth()/2;
			bottomText.y = 600 - 160;
			this.stage.addChild(bottomText); // add text to stage
			this.stage.addChild(topText); // add text to stage
		},
		showSigaret : function(){
			var _this = this;
			this.topText.text = 'Технологія легкого відкривання'.toUpperCase();
			this.topText.x = 1000/2 - this.topText.getMeasuredWidth()/2;
			this.stage.addChild(arrow);
			this.bottomText.text = 'Для БІЛЬШ  зручного користування пачкою'.toUpperCase();
			this.bottomText.x = 1000/2 - this.bottomText.getMeasuredWidth()/2;
			// crate arrow 	
			var arrow = this.arrow = new createjs.Bitmap("img/iOpen.png");
			var y = 190;
			var x = 406;
			arrow.x = 406;
			arrow.y = 190;
			arrow.scaleX = .9;
			arrow.scaleY = .9;
			arrow.addEventListener('click', gotoFilter);
			// crate shape
			var arrow_shape = new createjs.Shape();
 			arrow_shape.graphics.beginFill(createjs.Graphics.getRGB(0,0,0,0)).drawRect(x-2,y,52,53);
 			arrow_shape.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(x-2,y,52,53))
 			arrow_shape.addEventListener('click', gotoFilter);

 			this.stage.addChild(arrow_shape);
			this.stage.addChild(arrow);	
			var tween = this.arrowTween = createjs.Tween 
				.get(arrow, {loop : true})
				.to({y : y - 5}, 600)
				.to({y : y}, 600)
				.to({y : y + 5}, 600);


			function gotoFilter(){
				window.stopAllScroll = true;
				_this.img.gotoAndPlay('open');
				_this.topText.text = '';
				_this.bottomText.text = '';
				arrow.visible = false;
				arrow_shape.visible = false;
			}
		},
		showFilter : function(){
			this.topText.text = 'Унікальний турбо-фільтр з трьома секціями'.toUpperCase();
			this.topText.x = 1000/2 - this.topText.getMeasuredWidth()/2;

			this.bottomText.text = "Для миттєвої передачі\n насиченого та рівномірного смаку".toUpperCase();
			this.bottomText.textAlign = 'center';
			this.bottomText.x = 1000/2;
		},
		filterOne : function(){
			if( this.one ) return;
			var _this = this;
			this.one = true;
			this.showAllHd();

			var text_one = this.text_one =
				new createjs.Text("Вугільний фільтр".toUpperCase(),"16px Verdana","#6B747A");
			var text_one_bottom = this.text_one_bottom =
				new createjs.Text("Забезпечує м'який смак".toUpperCase(),"12px Verdana","#6B747A");

			text_one.x = 225;
   			text_one.y = 600/2 + 20;
   			text_one_bottom.x = 222;
   			text_one_bottom.y = 600/2 + 50;

   			this.stage.addChild(text_one);
   			this.stage.addChild(text_one_bottom);

		},
		filterTwo : function(){
			if( this.two ) return;
			var _this = this;
			this.two = true;
			this.showAllHd();
			var text_one = this.text_two =
				new createjs.Text("Надтонке волокно".toUpperCase(),"16px Verdana","#6B747A");
			var text_one_bottom = this.text_two_bottom =
				new createjs.Text("Робить смак рівномірним".toUpperCase(),"12px Verdana","#6B747A");

			text_one.x = 415;
   			text_one.y = 600/2 + 20;
   			text_one_bottom.x = 413;
   			text_one_bottom.y = 600/2 + 50;

   			this.stage.addChild(text_one);
   			this.stage.addChild(text_one_bottom);
		},
		filterThree : function(){
			if( this.three ) return;
			var _this = this;
			this.three = true;

			this.showAllHd();
			var text_one = this.text_three =
				new createjs.Text("Турбо-фільтр".toUpperCase(),"16px Verdana","#6B747A");
			var text_one_bottom = this.text_three_bottom = 
				new createjs.Text("МИТТЄВО ПЕРЕДАЄ СМАК".toUpperCase(),"12px Verdana","#6B747A");

			text_one.x = 633;
   			text_one.y = 600/2 + 20;
   			text_one_bottom.x = 616;
   			text_one_bottom.y = 600/2 + 50;

   			this.stage.addChild(text_one);
   			this.stage.addChild(text_one_bottom);

		},
		showAllHd : function(){
			if( !this.three || !this.two || !this.one) return;
			setTimeout(update, 2500);
			var _this = this;

			function update(){
				createjs.Tween 
					.get(_this.img)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_one)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_one_bottom)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_two)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_two_bottom)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_three)
					.to({alpha : 0}, 2000)

				createjs.Tween 
					.get(_this.text_three_bottom)
					.to({alpha : 0}, 2000)
					.call(cratePucks);

				var pack_1 = new createjs.Bitmap("img/canvas_hd_1.png");
				var pack_2 = new createjs.Bitmap("img/canvas_hd_2.png");
				var pack_3 = new createjs.Bitmap("img/canvas_hd_3.png");
				var pack_4 = new createjs.Bitmap("img/canvas_hd_4.png");
				pack_1.y = 150;
				pack_2.y = 150;
				pack_3.y = 150;
				pack_4.y = 150;
				pack_1.x = -200;
				pack_2.x = -200;
				pack_3.x = -200;
				pack_4.x = -200;
			
				function cratePucks(){

					_this.stage.clear();
					_this.stage.removeAllChildren();
					_this.crateTitle();
					_this.topText.text = '';

					_this.topText.text = 'Ще більше смаку KENT,\n завдяки унікальному турбо-фільтру'.toUpperCase();
					_this.topText.textAlign = 'center';
					_this.topText.x = 1000/2;
					_this.stage.addChild(pack_1);
					_this.stage.addChild(pack_2);
					_this.stage.addChild(pack_3);
					_this.stage.addChild(pack_4);

					createjs.Tween 
						.get(pack_4)
						.to({x:666}, 1000, createjs.Ease.circOut);

					createjs.Tween 
						.get(pack_3)
						.wait(1000)
						.to({x : 494}, 1000, createjs.Ease.circOut);

					createjs.Tween 
						.get(pack_2)	
						.wait(2000)
						.to({x : 322}, 1000, createjs.Ease.circOut);

					createjs.Tween 
						.get(pack_1)
						.wait(3000)
						.to({x : 150}, 1000, createjs.Ease.circOut)
						.call(function(){
							_this.enableScroll();
						})

					
				}
			}
		},
		animation : function(){
			var _this = this;
			var animationName = this.img.currentAnimation;
			switch ( animationName ){
				case 'rotate' : 
					this.img.paused = true;
					this.showSigaret();
					createjs.Ticker.setFPS(20);
					break;
				case 'filter' : 
					this.showFilter();
					break;
				case 'filterOne' :
					this.filterOne();
					break;
				case 'filterTwo' :
					this.filterTwo();
					break;
				case 'filterThree' :
					this.filterThree();
					this.img.paused = true;
					break;
			}
		},
		tick : function(event){
			this.stage.update(event);
		},
		enableScroll : function(){
			this.scrollImg.show();
			window.stopScrollAll = false;
		}
	};
	app.preload();
})();