$(function(){
	

	// button send question
	$('.button-wrapper a')
		.on({
			tap : function(e){
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

	$('.block-wrapper .submitMassage')
		.on({
			tap : function(e){
				e.preventDefault();
				$(this)
					.parent()
					.fadeOut();

				$(this)
					.parent()
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

});