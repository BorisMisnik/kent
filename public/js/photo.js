$(function(){

	var start = 0;
	var carouselInner = $('#myCarousel .carousel-inner');
	var carouselInnerSamll = $('#smallCarousel .carousel-inner');
	var json = $.parseJSON( $('#allImg').val() );

	// parse img
	var divSmall =  $('<div>',{
			'class' : 'item active'
		});
	divSmall.appendTo(carouselInnerSamll);

	for(var i = start; i < 7; i++){
		creatItem(json[i], start);
		start++;
	}

	function creatItem(obj, start){

		var div = $('<div>',{
			'class' : 'item'
		});

		var img = $('<img>',{
			'src' : obj['big-photo'],
			'data-large' : obj['large-photo']
		});
		var imgTwo = $('<img>',{
			'src' : obj['big-photo'],
			'data-item' : start
		});

		div.appendTo(carouselInner);

		img.appendTo(div);
		imgTwo.appendTo(carouselInnerSamll.find('.item:last'));
	}
	carouselInner.find('.item').eq(0).addClass('active');

	// init carousel
	$('.carousel').carousel({
		interval: false,
		cycle: false
	});

	function creatNewElements(){

		var divSmall =  $('<div>',{
				'class' : 'item'
			});
		divSmall.appendTo(carouselInnerSamll);

		for(var i = 0; i < 7; i++){
			if( json[start] === undefined ) break;
			creatItem(json[start], start);
			start++;
		}
		if( !carouselInnerSamll.find('.item:last').children().length ){
			carouselInnerSamll.find('.item:last').remove();
		}
		$('.carousel').carousel({
			interval: false,
			cycle: false
		});
	}
	// stop slide
	$('#myCarousel').on('slid', function(){  // big carousel
		var active = carouselInner.find('.active');

		if( !active.next().length ){
			creatNewElements();
		}
		if(  active.index() % 7 === 0 ){

		 	var itemScroll = active.index() / 7;
		 	itemScroll === 0 ? 1 : itemScroll;

		 	$('#smallCarousel').carousel(itemScroll);
		}

		$('#donwload').attr('href', active.find('img').data('large') )

	});

	$('#smallCarousel').on('slid', function(){ // small carousel
		if( !carouselInnerSamll.find('.active').next().length ){
			creatNewElements();
		}

	});

	//  small carousel
	$('#smallCarousel').on('click', '.right', function(){
		if( $('#smallCarousel .item').length === 1 ){
			creatNewElements();
		}	
	});

	$('#myCarousel').on('click', '.left', function(){
		var active = carouselInner.find('.active');
		if(  active.index() % 7 === 0 ){

			var itemScroll = active.index() / 7;
			itemScroll--;
			$('#smallCarousel').carousel(itemScroll);

		}
	});


	//  
	$('.carousel-control.left').on('click', function(){
		var active = $(this).parent().find('.active');
		if( active.index() === 0 ){
			return false;
		}

	});

	$('#smallCarousel').on('click', 'img', function(){
		$('#myCarousel').carousel( $(this).data('item') );
	});

});