(function(){
	if( $.browser.msie  && parseInt($.browser.version, 10) === 8 ) return;
	var app = {
		update : false,
		frames : [],
		one : false,
		two : false,
		three : false,
		section : $('#newHD'),
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
				window.stopScroll = true; // disable scroll
				_this.section.on('mousewheel' , function(){
					if( marker ){
						marker = false;
						_this.showNewHD();
					}
				});
				// show canvas
				_this.preloader.style.display = 'none';
				_this.canvas.style.display = 'block';
				_this.crateStage(); // init stage
				_this.resetAll(); // init stage
			};

		},
		nameImage : function(i){
			var zero = ( i < 10 ) ? '000' : ( i >= 10 && i < 100 ) ? '00' : '0'; // crate name image
			var name = '/img/hd/KENT_HD' + zero + '' + i + '.png';
			return name;
		},
		crateStage : function(){
			this.stage = new createjs.Stage(this.canvas); // init stage
			this.stage.enableMouseOver(10);
			this.stage.mouseMoveOutside = true;
<<<<<<< HEAD
			this.crateOldHd(); // 
			this.crateImages(); // crate sprites
			this.crateTitle(); // crate Title

			createjs.Ticker.setFPS(20);
			createjs.Ticker.addEventListener('tick', app.tick.bind(app));
		},
		crateOldHd : function(){
			var oldHD = this.oldHD = new createjs.Bitmap("img/old_hd.png"); 
			oldHD.x = 1000/2 - 158/2;
			oldHD.y = 600/2 - 245/2;
			oldHD.scaleX = 1;
			oldHD.scaleY = 1;
			this.stage.addChild(oldHD);

			var light = this.light = new createjs.Bitmap("img/light.png");
			light.x = 1000/2 - 678/2;
			light.y = 600/2 - 599/2;
			light.alpha = 0;
			this.stage.addChild(light);
		},
		showNewHD : function(){
			var _this = this;
			createjs.Tween 
				.get(this.oldHD)
				.to({alpha : 0}, 2000, Ease.getElasticIn);

			createjs.Tween 
				.get(this.light)
				.to({alpha : 1}, 3000, Ease.getElasticIn)
				.call(showNewHd);
		
			function showNewHd(){
				createjs.Tween 
					.get(_this.light)
					.to({alpha : 0}, 1800, Ease.getElasticIn);

				createjs.Tween 
					.get(app.img)
					.to({alpha : 1}, 3000, Ease.getElasticIn)
					.call(runAnimation);
			};

			function runAnimation(){
				_this.section.off();
				_this.topText.text = 'Новий та сучасний дизайн KENT HD'.toUpperCase();
				_this.topText.x = 1000/2 - _this.topText.getMeasuredWidth()/2;
				setTimeout(function(){
					_this.img.gotoAndPlay('rotate');
				},0)
			}

		},
		crateImages : function(){
			var _this = this;
=======
			this.crateImages(); // crate sprites
			this.crateTitle(); // crate Title

			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener('tick', app.tick.bind(app));
		},
		crateImages : function(){
			var _this = this;
>>>>>>> frontend
			var scale=.85;
			var ss = new createjs.SpriteSheet({ // crate Sprite Sheet
				images : _this.manifest,
				frames : _this.frames,
				animations : {
					rotate : [0, 50],
					open : [51,101],
					sigaret : [102,127],
					filter : [127,180],
					filterOne : [181, 202],
					filterOneRest : [203,220],
					filterTwo : [220, 245],
					filterTwoRest : [245, 260],
					filterThree : [260, 280],
					filterThreeRest : [280,299]
				}
			});
			
			var img = this.img = new createjs.BitmapAnimation(ss); // crate new SpriteSheet animation
			ss.getAnimation('open').next = 'sigaret';
			ss.getAnimation('sigaret').next = 'filter';
			// aline center
			img.scaleX = scale;
			img.scaleY = scale;
<<<<<<< HEAD
			img.alpha = 0;
=======
>>>>>>> frontend
			img.x = 1000/2 - (1000*scale)/2;
			img.y = (600/2 - (600*scale)/2) - 55;

			img.addEventListener('animationend', this.animation.bind(this));
		    // add img to stage
			this.stage.addChild(img);
<<<<<<< HEAD
			
		},
		crateTitle : function(){
			var topText = this.topText = new createjs.Text("Зустрічай оновлення КЕНТ HD".toUpperCase(), "32px Verdana", "#5d6870");
			topText.x = 1000/2 - topText.getMeasuredWidth()/2;
			topText.y = 10;
			var bottomText = this.bottomText = new createjs.Text("".toUpperCase(), "32px Verdana", "#5d6870");
			bottomText.x = 1000/2 - bottomText.getMeasuredWidth()/2;
			bottomText.y = 600 - 90;
=======
			img.gotoAndStop('rotate');
			setTimeout(function(){
				img.gotoAndPlay('rotate');
			},3000)
			
		},
		crateTitle : function(){
			var topText = this.topText = new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
			topText.x = 1000/2 - topText.getMeasuredWidth()/2;
			topText.y = 10;
			var bottomText = this.bottomText = new createjs.Text("".toUpperCase(), "20px Verdana", "#000");
			bottomText.x = 1000/2 - bottomText.getMeasuredWidth()/2;
			bottomText.y = 600 - 10;
>>>>>>> frontend
			this.stage.addChild(bottomText); // add text to stage
			this.stage.addChild(topText); // add text to stage
		},
		showSigaret : function(){
			var _this = this;
<<<<<<< HEAD
			this.topText.text = 'Технологія легкого відкривання'.toUpperCase();
			this.topText.x = 1000/2 - this.topText.getMeasuredWidth()/2;
			this.stage.addChild(arrow);
			this.bottomText.text = 'Для БІЛЬШ  зручного користування пачкою'.toUpperCase();
			this.bottomText.x = 1000/2 - this.bottomText.getMeasuredWidth()/2;
			// crate arrow 	
			var arrow = this.arrow = new createjs.Bitmap("img/arrow-hd.png");
			var x = 486;
			arrow.x = 486;
			arrow.y = 180;
			arrow.scaleX = .9;
			arrow.scaleY = .9;
			arrow.cursor = 'pointer';
			arrow.addEventListener('click', function(){
				_this.img.gotoAndPlay('open');
				_this.topText.text = '';
				_this.bottomText.text = '';
				arrow.visible = false;
			});
			this.stage.addChild(arrow);	
			var tween = this.arrowTween = createjs.Tween 
				.get(arrow,{loop : true})
				.to({x : x - 5}, 600)
				.to({x : x}, 600)
				.to({x : x + 5}, 600)
		},
		showFilter : function(){
			// this.arrow.removeEventListener('click');
			this.topText.text = 'Унікальний турбо-фільтр з трьома секціями'.toUpperCase();
			this.topText.x = 1000/2 - this.topText.getMeasuredWidth()/2;
			// crate shapes
			var shape_1 = this.shape_1 = new createjs.Shape();
 			shape_1.graphics.beginFill(createjs.Graphics.getRGB(0,0,0,0)).drawRect(145,170,200,150);
 			shape_1.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(145,170,200,150))
=======
			this.topText.text = 'Технологія легкого відкривання';
			this.topText.x = 1000/2 - this.topText.getMeasuredWidth()/2;
			this.stage.addChild(arrow);
			// this.bottomText.text
			// crate arrow 	
			var arrow = this.arrow = new createjs.Bitmap("img/iSig.png");
			arrow.x = 1000/2 - 53/2;
			arrow.y = 600/2 - 54/2;
			arrow.addEventListener('click', function(){
				_this.img.gotoAndPlay('open');
				arrow.visible = false;
			});
			this.stage.addChild(arrow);	
		},
		showFilter : function(){
			this.arrow.removeEventListener('click');
			// crate shapes
			var shape_1 = new createjs.Shape();
 			shape_1.graphics.beginFill(createjs.Graphics.getRGB(0,255,255,145)).drawRect(0,0,200,150);
 			shape_1.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,200,150))
>>>>>>> frontend
 			shape_1.cursor = 'pointer';
 			shape_1.addEventListener('click', this.filterOne.bind(this));
 			this.stage.addChild(shape_1);

<<<<<<< HEAD
 			var shape_2 = this.shape_2 = new createjs.Shape();
 			shape_2.graphics.beginFill(createjs.Graphics.getRGB(0,0,0,0)).drawRect(145,170,220,150);
 			shape_2.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(145,170,220,150))
=======
 			var shape_2 = new createjs.Shape();
 			shape_2.graphics.beginFill(createjs.Graphics.getRGB(0,255,255,145)).drawRect(0,0,200,150);
 			shape_2.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,200,150))
>>>>>>> frontend
 			shape_2.cursor = 'pointer';
 			shape_2.addEventListener('click', this.filterTwo.bind(this));
 			shape_2.x = 250;
 			this.stage.addChild(shape_2);

<<<<<<< HEAD
 			var shape_3 = this.shape_3 = new createjs.Shape();
 			shape_3.graphics.beginFill(createjs.Graphics.getRGB(0,0,0,0)).drawRect(145,170,215,150);
 			shape_3.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(145,170,215,150))
=======
 			var shape_3 = new createjs.Shape();
 			shape_3.graphics.beginFill(createjs.Graphics.getRGB(0,255,255,145)).drawRect(0,0,200,150);
 			shape_3.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,200,150))
>>>>>>> frontend
 			shape_3.cursor = 'pointer';
 			shape_3.addEventListener('click', this.filterThree.bind(this));
 			shape_3.x = 500;
 			this.stage.addChild(shape_3);
		},
		filterOne : function(){
			var _this = this;
<<<<<<< HEAD
			this.one = true;
			this.img.gotoAndPlay('filterOne');
			this.showAllHd();
			this.showTextFilterOne = function(){
				var text_one =
					new createjs.Text("Вугільний фільтр".toUpperCase(),"22px Verdana","#6B747A");
				var text_one_bottom = 
					new createjs.Text("Забезпечує м'який смак".toUpperCase(),"14px Verdana","#6B747A");

				text_one.x = 120;
   				text_one.y = 600/2 + 50;
   				text_one_bottom.x = 130;
   				text_one_bottom.y = 600/2 + 80;

   				this.stage.addChild(text_one);
   				this.stage.addChild(text_one_bottom);

				_this.shape_1.addEventListener('mouseout', function(){
					_this.img.gotoAndPlay('filterOneRest');
					_this.shape_1.removeAllEventListeners('mouseout');
				});
=======
			this.img.gotoAndPlay('filterOne');
			this.showTextFilterOne = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterOneRest');
				}, 2500)
>>>>>>> frontend
			}
		},
		filterTwo : function(){
			var _this = this;
<<<<<<< HEAD
			this.two = true;
			this.img.gotoAndPlay('filterTwo');
			this.showAllHd();
			this.showTextFilterTwo = function(){
				var text_one =
					new createjs.Text("Надтонке волокно".toUpperCase(),"22px Verdana","#6B747A");
				var text_one_bottom = 
					new createjs.Text("Робить смак рівномірним".toUpperCase(),"14px Verdana","#6B747A");

				text_one.x = 380;
   				text_one.y = 600/2 + 50;
   				text_one_bottom.x = 395;
   				text_one_bottom.y = 600/2 + 80;

   				this.stage.addChild(text_one);
   				this.stage.addChild(text_one_bottom);
				_this.shape_2.addEventListener('mouseout', function(){
					_this.img.gotoAndPlay('filterTwoRest');
					_this.shape_2.removeAllEventListeners('mouseout');
				});
=======
			this.img.gotoAndPlay('filterTwo');
			this.showTextFilterTwo = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterTwoRest');
				}, 2500)
>>>>>>> frontend
			}
		},
		filterThree : function(){
			var _this = this;
<<<<<<< HEAD
			this.three = true;
			this.img.gotoAndPlay('filterThree');
			this.showAllHd();
			this.showTextFilterThree = function(){
				var text_one =
					new createjs.Text("Турбо-фільтр".toUpperCase(),"22px Verdana","#6B747A");
				var text_one_bottom = 
					new createjs.Text("Миттєва передача смаку".toUpperCase(),"14px Verdana","#6B747A");

				text_one.x = 690;
   				text_one.y = 600/2 + 50;
   				text_one_bottom.x = 675;
   				text_one_bottom.y = 600/2 + 80;

   				this.stage.addChild(text_one);
   				this.stage.addChild(text_one_bottom);

				_this.shape_3.addEventListener('mouseout', function(){
					_this.img.gotoAndPlay('filterThreeRest');
					_this.shape_3.removeAllEventListeners('mouseout');
				});
			}
		},
		showAllHd : function(){
			if( !this.three || !this.two || !this.one) return;
			setTimeout(update, 3000);
			var _this = this;

			function update(){
				createjs.Tween 
					.get(_this.img)
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

					_this.topText.text = 'Миттєве насичення смаком'.toUpperCase();
					_this.topText.x = 1000/2 - _this.topText.getMeasuredWidth()/2;
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
							_this.section.addClass('reset');
						})

					
				}
=======
			this.img.gotoAndPlay('filterThree');
			alert('123')
			this.showTextFilterThree = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterThreeRest');
					_this.resetAll();
				}, 2500)
>>>>>>> frontend
			}
		},
		animation : function(){
			var animationName = this.img.currentAnimation;
<<<<<<< HEAD
=======
			console.log(animationName)
>>>>>>> frontend
			switch ( animationName ){
				case 'rotate' : 
					this.img.paused = true;
					this.showSigaret();
<<<<<<< HEAD
					window.stopScroll = false;
=======
>>>>>>> frontend
					break;
				case 'filter' : 
					this.img.paused = true;
					this.showFilter();
					break;
				case 'filterOne' :
					this.img.paused = true;
					this.showTextFilterOne();
					break;
				case 'filterTwo' :
					this.img.paused = true;
					this.showTextFilterTwo();
					break;
				case 'filterThree' :
					this.img.paused = true;
					this.showTextFilterThree();
					break;
				case 'filterOneRest' :
				case 'filterTwoRest' :
				case 'filterThreeRest' :
					this.img.paused = true;
					break;
			}
		},
		tick : function(event){
			this.stage.update(event);
		},
		resetAll : function(){
<<<<<<< HEAD
			var _this = this;

=======
			this.img.stop();
			this.stage.removeAllChildren();
			this.stage.clear();
			this.crateImages();
>>>>>>> frontend
		}
	};
	app.preload();
})();