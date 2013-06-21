$(function(){

	// big photo slider

	var photo = $('.photos'),
		img   = $('.big-photo-wrapper').find('img'),
		next  = $('#next'),
		prev  = $('#prev');

	img.each(function(){

		$this = $(this);
		$this.css({
			'left' : $this.index() * 475
		});

		
		
	});

});