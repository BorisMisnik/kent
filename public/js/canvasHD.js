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
			var n = 0;
			for (var i = 0; i <= 60 ; i++) {	
				this.manifest.push(this.nameImage(i));	
				this.frames.push([0, 0, 1000, 600, n, 0, 0]);
				n++;
			};
			for (var i = 60; i <= 127 ; i++) {
				this.manifest.push(this.nameImage(i));
				this.frames.push([0, 0, 1000, 600, i, 0, 0]);
			};
			for (var i = 0; i < this.manifest.length; i++) {
				preload.loadFile(this.manifest[i]); // upload image	
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
			this.crateSpriteSheet(); // crate sprites

			createjs.Ticker.setFPS(22);
			createjs.Ticker.addEventListener('tick', app.tick.bind(app));
		},
		crateSpriteSheet : function(){
			var _this = this;
			var data = {}; 
			var scale=.9;
			//setup SpriteSheet
			data.images = this.manifest;
			data.frames = this.frames;
			data.animations = {
				rotate : [0, 50],
				open : [51,101],
				sigaret : [102,127]
			};

			var ss = new createjs.SpriteSheet(data);
			this.animation = new createjs.BitmapAnimation(ss); // crate new SpriteSheet animation
			ss.addEventListener("complete", handler);
			// aline center
		    this.animation.scaleX = scale;
		    this.animation.scaleY = scale;
		    this.animation.x = 0;
		    this.animation.y = 0;

		    // add sprite to stage
			this.stage.addChild(this.animation);
			// update stage
			this.animation.gotoAndPlay('rotate');
			this.update = true;
			// run first animation
		},
		tick : function(event){
			// if( this.update ){
				this.stage.update(event);
				this.update = false;
			// }
		}
	};
	app.preload();
})();