$(function(){
	var container = $('.container-fluid');
	var articles = $('article').not('.copy');
	var menuLi = $('.nav-site').children('li');
	var navCategory = $('.nav-scategory');
	var buttonScroll = $('.scrollButton a');
	var copy;
	var cateGoryName;

	$('.nav-site').on('click','li',clickMenu);
	navCategory.children('li').on('click',clickCategory);

	$(window).resize(function(){
		sizeSection();
	})
	buttonScroll.on('click',clickScrollButon);

	container.on('mousewheel', function(event, delta, deltaX, deltaY) {
		if(!container.is(':animated')){
	    	if(deltaY === -1){
	    		container.animate({'scrollTop' : '+=' + container.height()},1000,'easeInOutExpo',stopScroll);
	    	}
	    	else if(delta === 1){
	    		container.animate({'scrollTop' : '-=' + container.height()},1000,'easeInOutExpo',stopScroll);
	    	}
		}
	});

	$(document).on('keydown',function(e){
		var up = 38,
		down = 40;
		if(!container.is(':animated')){
			if (e.keyCode == up) {
	        	container.animate({'scrollTop' : '-=' + container.height()},1000,'easeInOutExpo',stopScroll);
	   		}
		    if (e.keyCode == down) {
		        container.animate({'scrollTop' : '+=' + container.height()},1000,'easeInOutExpo',stopScroll);
		    }
		}
	})

	function sizeSection(){
		$('article').css('height',container.height());

		container.find('section').each(function(){
			var $this 		  = $(this);
			var allArticle 	  = $this.children('article').length;
			var heightArticle = $this.children('article').height()

			$this.css('height',heightArticle * allArticle);

		});
		var activeSection = $('.active').data('slide');
		container.scrollTop(container.scrollTop() + $('.now').offset().top);
	}

	function clickMenu(){ 
		var $this = $(this);
		var slide = $this.data('slide');

		container.stop(true,true).animate({'scrollTop' : '+=' + $(slide).offset().top},500,'easeInOutExpo',stopScroll);
	}

	function clickCategory(){
		var $this = $(this);
		cateGoryName = $this.text().toLowerCase();
		var article = $('.now').parent().find('.' + cateGoryName).first();

		$('.copy.' + cateGoryName).css('display','table');
		container.stop(true,true).animate({'scrollTop' : '+=' + article.offset().top},500,'easeInOutExpo',stopScroll);

		articles = $('article');
	}	

	function clickScrollButon(e){
		e.preventDefault();

		var $this = $(this);
		if($this.is('.prev')){
			container.stop(true,true).animate({'scrollTop' : '-=' + container.height()},500,'easeInOutExpo',stopScroll);
		}	
		else container.stop(true,true).animate({'scrollTop' : '+=' + container.height()},500,'easeInOutExpo',stopScroll);
	}

	function stopScroll(){
		var activeMenu;
		var now;

		$('.now').removeClass('now');
		$('.active').removeClass('active');

		articles.each(function(){
			var $this = $(this);

			if($this.offset().top === 0 && $this.is(':visible')){

				$this.addClass('now');

				now = $('.now');
				activeMenu = $this.parent().attr('id');
				return false;
			}
		});

		menuLi.each(function(){
			var $this = $(this);
			if($this.data('slide') === '#' + activeMenu) $this.addClass('active');
		});

		if($('.now').parent().is('#sigarets') || $('.now').parent().is('#history')){
			navCategory.show();
			nameSigarets = now.data('name');

			navCategory.children('li').each(function(){
				var $this = $(this);

				if($this.text().toLowerCase() === nameSigarets){
					$this.addClass('active')
				}
			});
		}	
		else{
			navCategory.hide();
		}
		if(cateGoryName){

			if($('.copy.' + cateGoryName).data('name') !== navCategory.children('.active').text().toLowerCase() && $('.copy.' + cateGoryName).is(':visible')){
				$('.copy.' + cateGoryName).hide();
				container.scrollTop(container.scrollTop() + $('.now').offset().top);
				articles = $('article').not('.copy');
			}
		}

	}
	sizeSection();
})