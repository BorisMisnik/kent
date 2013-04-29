$(function(){
	var container = $('.container-fluid');
	var raphael = background();
	var markerMonth = true;
 	function scrollBar(){
        if ( markerMonth ) {

                $(".ik_select_list_inner ul")
                    .mCustomScrollbar({
                        advanced:{ updateOnContentResize: true },
                        mouseWheel : true
                    });
             markerMonth = false;
         }
    }

   
	$('#month').ikSelect({
        ddFullWidth : false,
        autoWidth : false,
        ddMaxHeight  :114,
        ddCustomClass: "month",
        onShow : scrollBar
    });

	$('input[placeholder], textarea[placeholder]').placeholder();

    $('.month .ik_select_option').click(function(){
        var $this = $(this);
        $this.attr('title',$this.data('title'))
 
    }).hover(function(){
    	$(this).data('title',$(this).attr('title'))
    		   .attr('title','');
    },function(){
        $(this).attr('title',$(this).data('title'));
    });

    $('.month .ik_select_option').attr({
    	'name' : $(this).attr('title')
    });


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

});