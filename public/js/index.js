$(function(){
	var container = $('.container-fluid');

	$('input[placeholder], textarea[placeholder]').placeholder();


	$(window).resize(sizeSection);

	function sizeSection(){

		$('.scrollButton').css({
			'bottom' : function(){
				var bottom = $('.footer').height() + $('.xv').height() + 49;
				return bottom;
			}
		});

		$('article').css('height',container.height());
		container.scrollTop(container.scrollTop() + $('section.now').offset().top);
	};

	
	sizeSection();
	// button send question
	$('.button-wrapper a')
		.on({
			click : function(e){
				e.preventDefault();

				var block = $('.block-wrapper');
				if(!block.is(':visible')){

					block.fadeIn();

					block
						.find('p')
						.hide();
					block
						.find('form')
						.show();
				}
				else{
			
					block.fadeOut();
				}
			}
		});

	// submit form massege

	$('.block-wrapper form')
		.on({
			submit : function(e){
				e.preventDefault();

				$(this)
					.fadeOut();

				$(this)
					.parent()
					.find('p')
					.fadeIn()
					.delay(1800)
					.fadeOut(function(){
						$('.block-wrapper').fadeOut();
					});
			}
		});


	$('#profile').on({
		focus : function(){

			if( $('#profile').find('form').is('.disable') ){

				$(this).blur();
			}

		}
	},'input');

	//select 

	$('select').selectpicker();
});