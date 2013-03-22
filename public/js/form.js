$(function(){

	$('#massege').jScrollPane();

	$('input').focus(function(){
		if($(this).is('.inputError')){
			$(this).removeClass('inputError')
		}
	}).each(function(){
		$(this).data('value',$(this).val())
	})

	$(':text').focus(function(){
		var $this = $(this);
		var value = $this.val();

		if(value === $this.data('value')){
			$this.val('');
		}

		if($this.data('value') === 'Пароль' || $this.data('value') === 'Пiдтвердження пароля'){
			$this.attr('type','password');
		}

	}).blur(function(){

		var $this = $(this);

		if($this.val().length < 1 || $this.val() === ' '){
			$this.val($this.data('value'));
		}

		if($this.is(':password') && $this.val() == 'Пароль' || $this.val() == 'Пiдтвердження пароля'){
			$this.attr('type','text');
		}

	});

		
	$('label.checkbox').on('click',function(e){
		e.preventDefault();

		var $this = $(this);
		var input = $this.find(':checkbox');
		var span = $this.find('span');

		if(span.is('.check')){
			span.removeClass('check');
			input.attr('checked',false);
		}
		else{
			span.addClass('check');
			input.attr('checked',true);
		}
	});
	$('label.checkbox a').click(function(){window.location = $(this).attr('href')})

	$('.btn').on('click',function(e){
		e.preventDefault();
		$(this).parent().find(':file').click();
	});

	$(':file').on('change',function(e){
		  var $this = $(this);

		  $this.parent().find(':text').val($this.val());
	});

	var background = $('.background');
	background.css('opacity','.5');
	$('#web').on('click',function(e){

		e.preventDefault();
		background.fadeIn('slow',showPopUp)
		function showPopUp(){
			background.css({
				'width' : $(document).width(),
				'heght' : $(document).height()
			})
			$('.webCamera').fadeIn('slow');
		}
	});

	background.on('click',closePopUp)
	$(document).keyup(function(e) {
  		if (e.keyCode == 27) closePopUp();
	});

	function closePopUp(){
		$('.webCamera').fadeOut('slow',function(){
			background.fadeOut('slow');
		});
	}

	$(window).resize(function(){
		background.css({
			'width' : $(window).width(),
			'heght' : $(document).height()
		})
	});

})