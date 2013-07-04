$(function(){

	var start = 0;
	var count = 7;
	var direction = '';
	var carouselInner = $('#myCarousel .carousel-inner');
	var carouselInnerSamll = $('#smallCarousel .carousel-inner');
	var json = $.parseJSON( $('#allImg').val() );


	if( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ){
		count = 3;
	}

	// parse img
	var divSmall =  $('<div>',{
		'class' : 'item active'
	});
	divSmall.appendTo(carouselInnerSamll);

	for(var i = start; i < count; i++){
		creatItem(json[i], start);
		start++;
	}

	function creatItem(obj, start){

		var a = $('<a>',{
			'class' : 'item',
			'href' : '#lightbox',
			'data-toggle' : 'lightbox'
		});

		var img = $('<img>',{
			'src' : obj['big-photo'], 
			'data-medium' : obj['medium-photo'],
			'data-large' : obj['large-photo']
		});

		var div = $('<div>')
		var imgTwo = $('<img>',{
			'src' : obj['big-photo'],
			'data-item' : start
		});

		a.appendTo(carouselInner);
		img.appendTo(a);

		div.appendTo(carouselInnerSamll.find('.item:last'));
		imgTwo.appendTo(div);
	}

	carouselInner.find('.item').eq(0).addClass('active');

	// init carousel
	$('.carousel').carousel({
		interval: false,
		cycle: false
	});

	var href = carouselInner.find('.active img').data('large');
	$('#donwload').attr('href', href);
	$('#lightbox').find('img').attr('src', href);



	function creatNewElements(){

		var divSmall =  $('<div>',{
				'class' : 'item'
			});
		divSmall.appendTo(carouselInnerSamll);

		for(var i = 0; i < count; i++){
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

		if(  active.index() % count === 0 ){

		 	var itemScroll = active.index() / count;
		 	itemScroll === 0 ? 1 : itemScroll;

		 	$('#smallCarousel').carousel(itemScroll);
		}
	});

	$('#myCarousel').on('slide', function(){
		var active = carouselInner.find('.active');
		var img;

		if( direction === 'next' ){
			img = active.next().find('img');
		}
		else{
			img = active.prev().find('img');
		}

	
		$('#lightbox').find('img').attr('src', img.data('medium')) // popup photo
		$('#donwload').attr('href', img.data('large'))  // button download 	
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
		if(  active.index() % count === 0 ){

			var itemScroll = active.index() / count;
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


	// lightBox
	var lightBox = $('#lightbox');
	var lightBoxContent = $('.lightbox-content');
	lightBox.lightbox({
		show:false
	});

	// lightBox event show
	lightBox.on('show', function(){
		var active = carouselInner.find('.active');

		if( active.index() === 0 )
			$('.prev-photo').hide();	
	});

	// next button lightBox
	$('.next-photo').on('click', function(e){
		e.preventDefault();

		direction = 'next';
		$('.carousel').carousel('next');
		lightBoxContent.removeAttr('style');
		$('.prev-photo').show();
		lightBox.lightbox('preloadSize');

	});

	// prev button lightBox
	$('.prev-photo').on('click', function(e){
		e.preventDefault();

		var active = carouselInner.find('.active');

		direction = 'prev';
		$('.carousel').carousel('prev');
		lightBoxContent.removeAttr('style');
		lightBox.lightbox('preloadSize');
		if( active.index() - 1 === 0 )
			$('.prev-photo').hide();

	});

	// donwload click
	$('#donwload').on('click', function(){
		window.location = $(this).attr('href');
	});

	//  click category patty, refresh carousel
	$('.nav-photo').on('click vclick', 'li', function(){
		$this = $(this);

		// var url = '/putty/' + $this.data('name');
		// $.getJSON(url, carousel);

		var url = '/putty';
		$.getJSON(url, { putty: $this.data('name') }, carousel);
		function carousel(data){

			$('#allImg').val(data);

			carouselInner.find('.item').remove();
			carouselInnerSamll.find('.item').remove();
			start = 0;
			json = $.parseJSON( $('#allImg').val() );

			var divSmall =  $('<div>',{
				'class' : 'item active'
			});
			divSmall.appendTo(carouselInnerSamll);

			for(var i = start; i < count; i++){
				creatItem(json[i], start);
				start++;
			}
			carouselInner.find('.item').eq(0).addClass('active');
			carouselInnerSamll.find('.item').eq(0).addClass('active');

			$('.putty').removeClass('putty');
			$this.addClass('putty');

		}

	});

});
