define(
    [],
    function() {

        /**
         * Initialize form controls
         */

        function init() {

            var containerFluid = $('.container-fluid'),
                wrapperForm = $('.wrapper-form'),
                textarea = $('textarea'),
                background = $('.background');

            if ($('#registered').length){
                containerFluid.css(
                    'min-height', wrapperForm.height() + 230);
            }

            if ($('#feedback').length){
                containerFluid.css(
                    'min-height', wrapperForm.height() + 230);
            }

            $('input')
                .off( 'focus', inputFocus )
                .focus( inputFocus )
                .each( function(){
                    $(this).data( 'value',
                        $(this).val());
                });

            textarea
                .off( 'focus', textareaFocus )
                .focus( textareaFocus );

            textarea.each(
                function(){
                    $(this).data( 'text',
                        $(this).text());
                });

            textarea
                .off( 'focus', textareaFocus1 )
                .focus( textareaFocus1 )
                .off( 'blur', textareaBlur1 )
                .blur( textareaBlur1 );

            $('label.checkbox')
                .off( 'click', checkboxClick )
                .click( checkboxClick );

            $('label.checkbox a')
                .off( 'click', checkboxClickA )
                .click( checkboxClickA );

            $('.btn')
                .off( 'click', buttonCLick )
                .click( buttonCLick );

            $(':file')
                .off( 'change', fileChange )
                .on( 'change', fileChange);

            $('#web')
                .off( 'click', webClick )
                .click( webClick );

            // popup
            background
                .css( 'opacity', '.5' );
            background
                .off( 'click', closePopUp )
                .click( closePopUp );
            $( document )
                .off( 'keyup', closePopKey )
                .keyup( closePopKey );

            // resize
            $( window )
                .off( 'resize', resize )
                .resize( resize );

            // field: phone
            var phone = $( '#mobilePhone' );
            if ( phone.length )
                phone.mask( '0 (99) 999-99-99' );

            // field: day number
            var date = $( '#date' );
            if ( date.length ) {
                $.mask.definitions[ '3' ] = '[0-3]';
                date.mask( '39' );
            }
            // field: month number
            var date = $( '#month' );
            if ( date.length ) {
                $.mask.definitions[ '1' ] = '[0-1]';
                date.mask( '19' );
            }
            // field: date number
            var year = $( '#year' );
            if ( year.length ) {
                $.mask.definitions[ '2' ] = '[0-2]';
                year.mask( '2999' );
            }

            // file button
            $( '.fileButton' )
                .off( 'click', clickUploadFile )
                .click( clickUploadFile );
        }


        // Event Handlers

        function clickUploadFile( e ) {
            e.preventDefault();

            $( this )
                .next( 'input:file' )
                .click();
        }

        function inputFocus() {

            var $this = $(this),
                containerFluid = $('.container-fluid'),
                wrapperForm = $('.wrapper-form');

            if ($this.is('.inputError')) {

                $this.removeClass('inputError');
                $this.parent().find('input').removeClass('inputError');
                $this.parents('.controls').find('.error').hide();

                if ($this.parents('#login')){
                    $this.parent().find('.error').hide();
                }
                if ($('#registered').length){
                    containerFluid.css('min-height',wrapperForm.height()+230);
                }
                if ($('#feedback').length){
                    containerFluid.css('min-height',wrapperForm.height() + 230);
                }
            }
        }

        function textareaFocus() {
            var area = $('.wrapperTextarea');
            if( area.is( '.inputError' )) {
                area.removeClass( 'inputError' );
                $( this )
                    .parents( '.controls' )
                    .find( 'span' )
                    .hide();
            }
        }

        function textareaFocus1() {
            var $this = $(this);
            if ($this.text() === $this.data('text'))
                $this.text('');
        }

        function textareaBlur1() {
            var $this = $(this);
            if ($this.val() === '')
                $this.text($this.data('text'))
        }

        function checkboxClick( e ) {
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

            if ($this.find('span').is('.chekboxError')){
                $('.checkbox + .error')
                    .hide();
                $('label.checkbox')
                    .find('span')
                    .removeClass('chekboxError');
            }
        }

        function checkboxClickA() {
            window.location =
                $(this).attr('href');
        }

        function buttonCLick( e ) {
            e.preventDefault();
            $( this )
                .parent()
                .find( ':file' )
                .click();
        }

        function fileChange( e ) {
            var $this = $(this);
            $this
                .parent()
                .find(':text')
                .val($this.val());
        }

        function webClick( e ){
            var background = $('.background');
            e.preventDefault();
            background.fadeIn('slow', showPopUp );
            // then
            function showPopUp() {
                background.css({
                    'width' : $(document).width(),
                    'heght' : $(document).height()
                });
                $('.webCamera').fadeIn('slow');
            }
        }

        function closePopKey( e ) {
            if ( e.keyCode == 27 )
                closePopUp();
        }

        function closePopUp() {
            var background = $('.background');
            $('.webCamera').fadeOut('slow',
                function(){
                    background.fadeOut('slow');
                });
        }

        function resize(){
            var background = $('.background');
            background.css({
                'width' : $(window).width(),
                'heght' : $(document).height()
            })
        }

        // init scroll rulles
        
        // API

        return {
            init: function() {
                $( init );
                if($('#rules').length){
                    $('#rulles').mCustomScrollbar();
                }

                $('input[placeholder], textarea[placeholder]').placeholder();
                $('#month').selectbox();
           }

            // todo: setup only needed events
//            setup: function( name ) {
//                switch( name ) {
//                    case 'login':
//                        break;
//                    case 'register':
//                        break;
//                }
//            }
        };

    });