(function(){

	var app = {
		update : false,
		frames : [],
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
			this.stage.enableMouseOver(10);
			this.stage.mouseMoveOutside = true;
			this.crateImages(); // crate sprites
			this.crateTitle(); // crate Title

			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener('tick', app.tick.bind(app));
		},
		crateImages : function(){
			var _this = this;
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
			img.x = 1000/2 - (1000*scale)/2;
			img.y = (600/2 - (600*scale)/2) - 55;

			img.addEventListener('animationend', this.animation.bind(this));
		    // add img to stage
			this.stage.addChild(img);
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
			this.stage.addChild(bottomText); // add text to stage
			this.stage.addChild(topText); // add text to stage
		},
		showSigaret : function(){
			var _this = this;
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
 			shape_1.cursor = 'pointer';
 			shape_1.addEventListener('click', this.filterOne.bind(this));
 			this.stage.addChild(shape_1);

 			var shape_2 = new createjs.Shape();
 			shape_2.graphics.beginFill(createjs.Graphics.getRGB(0,255,255,145)).drawRect(0,0,200,150);
 			shape_2.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,200,150))
 			shape_2.cursor = 'pointer';
 			shape_2.addEventListener('click', this.filterTwo.bind(this));
 			shape_2.x = 250;
 			this.stage.addChild(shape_2);

 			var shape_3 = new createjs.Shape();
 			shape_3.graphics.beginFill(createjs.Graphics.getRGB(0,255,255,145)).drawRect(0,0,200,150);
 			shape_3.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0,0,200,150))
 			shape_3.cursor = 'pointer';
 			shape_3.addEventListener('click', this.filterThree.bind(this));
 			shape_3.x = 500;
 			this.stage.addChild(shape_3);
		},
		filterOne : function(){
			var _this = this;
			this.img.gotoAndPlay('filterOne');
			this.showTextFilterOne = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterOneRest');
				}, 2500)
			}
		},
		filterTwo : function(){
			var _this = this;
			this.img.gotoAndPlay('filterTwo');
			this.showTextFilterTwo = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterTwoRest');
				}, 2500)
			}
		},
		filterThree : function(){
			var _this = this;
			this.img.gotoAndPlay('filterThree');
			alert('123')
			this.showTextFilterThree = function(){
				var text_one = this.text_one =
					new createjs.Text("Новий та сучасний дизайн KENT HD".toUpperCase(), "20px Verdana", "#000");
				setTimeout(function(){
					_this.img.gotoAndPlay('filterThreeRest');
					_this.resetAll();
				}, 2500)
			}
		},
		animation : function(){
			var animationName = this.img.currentAnimation;
			console.log(animationName)
			switch ( animationName ){
				case 'rotate' : 
					this.img.paused = true;
					this.showSigaret();
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
			this.img.stop();
			this.stage.removeAllChildren();
			this.stage.clear();
			this.crateImages();
		}
	};
	app.preload();
})();