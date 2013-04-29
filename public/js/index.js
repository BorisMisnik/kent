$(function(){
	var container = $('.container-fluid');
	var raphael = background();
	var markerMonth = true;
 	function scrollBar(){
        if ( markerMonth ) {

                $(".ik_select_list_inner")
                    .mCustomScrollbar({
                        advanced:{ updateOnContentResize: true },
                        mouseWheel : true
                    });
             markerMonth = false;
         }
    }

    function sigrates(){

    	if($('.ik_select_list_inner').hasClass('mCustomScrollbar')) return;

    	$('.ik_select_list_inner')
    		 .mCustomScrollbar({
               	advanced:{ updateOnContentResize: true },
               	mouseWheel : true,
               	set_height : 100
            });
    }
    
	$('#month').ikSelect({
        ddFullWidth : false,
        autoWidth : false,
        ddMaxHeight  :114,
        ddCustomClass: "month",
        onShow : scrollBar
    });

	$('.smoke select').ikSelect({
		ddFullWidth : false,
        autoWidth : false,
        onShow : sigrates
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
					block
						.find('p')
						.hide();
					block
						.find('form')
						.show();

					block.fadeIn()
						 .delay(2500)
						 .fadeOut();
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
					.fadeIn();

			}
		});

});