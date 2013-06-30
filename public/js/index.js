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

	$('.block-wrapper .submitMassage')
		.on({
			click : function( e ) {
				e.preventDefault();
                var self = this;

                // ajax message
                var input = $( self ).parent().find( '.massege' ),
        	    message = input.val();
                $.post( '/feedback', { message: message })
                    .done( function( res ) {
                        if ( res && res.error ) errorSendMessage( res.error );
                        else closeMsgPopup();
                    })
                    .fail( function() {
                        errorSendMessage();
                    });

                // message sending error
                function errorSendMessage( err ) {
                    // todo: show error
                    closeMsgPopup();
                }
                // close window
                function closeMsgPopup() {
                    $( self )
                        .parent()
                        .fadeOut();
                    $( self )
                        .parent()
                        .parent()
                        .find('p')
                        .fadeIn()
                        .delay(1800)
                        .fadeOut(function(){
                            $('.block-wrapper').fadeOut();
                            // clean input
                            input.val( '' );
                        });
                }
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
	$('.btn-group *').on('mouseenter',function(){
		$(this).css('opacity','1');
	})
});