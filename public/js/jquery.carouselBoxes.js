$(function(){
	var div = $('.carousel > div');

	div.eq(0)
	   .css( 'left' , '8.020833333333334%' );

	div.eq(1)
		.css( 'left' , '21%');

	div.eq(2)
		.css('left' , '45.25%');

	div.eq(3)
		.css('left' , '68.54166666666667%');

	div.eq(4)
		.css('left' , '81.916667%');

	$('#zero,#fourth')
		.parent()
		.css('height','284px');

	$('#first,#third')
		.parent()
		.css('height','319px');

	$('#second')
		.parent()
		.css('height','371px');

	if ( $.browser.msie && parseInt( $.browser.version, 10) <= 8 ) return;

	TweenMax.staggerTo($('#zero,#fourth'),0,{scale:0.4});
	TweenMax.staggerTo($('#first,#third'),0,{scale:0.7});
	TweenMax.staggerTo($('#second'),0,{scale:1});

	var animate = false;
	$('.wrapeer')
		.on({

			mouseenter : function(){

				if(animate) return;

				var div = $(this).find('div');
				TweenMax.to(div,0.4,{scale:1});
				TweenMax.to(div.parent(),0.4,{height : 371});
			},

			mouseleave : mouseleave 

		});

		function mouseleave (){

			$this = $(this).children('div');

			switch ( $this.attr('id') ){

				case 'zero'   :
				case 'fourth' :
					TweenMax.to($this,0.4,{scale:0.4});
					TweenMax.to($this.parent(),0.4,{height:284});
					break;

				case 'first' :
				case 'third' :
					TweenMax.to($this,0.4,{scale:0.7});
					TweenMax.to($this.parent(),0.4,{height:319});
					break;

				default :
					TweenMax.to($this,0.4,{scale:1});
					TweenMax.to($this.parent(),0.4,{height:371});
			}

		};

});