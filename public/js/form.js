$(function(){
	var containerFluid = $('.container-fluid');
	var wrapperForm = $('.wrapper-form');
	if($('#registered').length){
		containerFluid.css('min-height',wrapperForm.height() + 230);
	}
	if($('#feedback').length){
		containerFluid.css('min-height',wrapperForm.height() + 230);
	}
	$('input').focus(function(){
		var $this = $(this);
		if($this.is('.inputError')){

			$this.removeClass('inputError');
			$this.parent().find('input').removeClass('inputError')
			$this.parents('.controls').find('.error').hide();

			if($this.parents('#login')){
				$this.parent().find('.error').hide();
			}

			if($('#registered').length){
				containerFluid.css('min-height',wrapperForm.height() + 230);
			}
			if($('#feedback').length){
				containerFluid.css('min-height',wrapperForm.height() + 230);
			}
		}

	}).each(function(){
		$(this).data('value',$(this).val())
	});

	$('textarea').focus(function(){
		if($('.wrapperTextarea').is('.inputError')){
			$('.wrapperTextarea').removeClass('inputError')
			$(this).parents('.controls').find('span').hide();
		}
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

	$('textarea').each(function(){$(this).data('text',$(this).text())});

	$('textarea').focus(function(){
		var $this = $(this);
		if($this.text() === $this.data('text')) $this.text('')
	}).blur(function(){
		var $this = $(this);
		if($this.val() === '') $this.text($this.data('text'))
	})

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

		if($this.find('span').is('.chekboxError')){
			$('.checkbox + .error').hide();
			$('label.checkbox').find('span').removeClass('chekboxError');
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