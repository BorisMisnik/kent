$(function(){
	$('.container-fluid').css('min-height', $('.xv').height() + $('.footer').height() + $('.wrapper-form').height() + 60)
	var scroll = new iScroll('scroll', {
		 onBeforeScrollStart: function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;

            console.log( target.tagName );
            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
        }
    });

	window.addEventListener("resize", function() {
		$('.container-fluid').css('margin-bottom', $('.xv').height() + $('.footer').height() + $('.wrapper-form').height() + 60)
		setTimeout(function(){
			scroll.refresh();
		}, 0);
	}, false);
	
	

	//  form
	// remove error class
	$('input, textarea, select').on('focus', function(){
		$this = $(this);

		if( $this.is( '.inputError' ) || $this.parent().is( '.inputError' ) ){
			$this.removeClass('inputError');
			$this.parent().removeClass('inputError');
		}
			
	});

	// checkbox 
	$('span.checkbox').on('click', function(e){
		
		e.stopImmediatePropagation()
		e.preventDefault();

		var $this = $(this);
		$this.removeClass( 'chekboxError' );

		if( $this.is( '.check' ) ){
			$this.parent().find('input').attr('checked', false);
			$this.removeClass( 'check' );
		}
		else{
			$this.parent().find('input').attr('checked', true);
			$this.addClass( 'check' );
		}

	});

	// label
	$('label').on('click', 'a', function(){
		window.location = $(this).attr('href');
	})

	// input file
	// file input suport http://viljamis.com/blog/2012/file-upload-support-on-mobile/
	var isFileInputSupported = (function () {
		 // Handle devices which falsely report support
		if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
			return false;
		}
		// Create test element
		var el = document.createElement("input");
	 	el.type = "file";
		return !el.disabled;

	})();

	if( !isFileInputSupported ){
		$('.fileButton').hide();
		$('.button-photo').css('text-align', 'center');
	}

	$(':file').on('change',function(e){
		$('.fileInput').val( $(this).val() );
	});

	// 

})