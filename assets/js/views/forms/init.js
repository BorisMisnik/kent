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
                background = $('.background'),
                device = (function(){
                    if( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ) return false;
                })();
                var isFileInputSupported = (function () {
                   if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1|2.3))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
                        return false;
                    }
                })();

            if( !isFileInputSupported ){
                $('.fileButton').hide();
                $('.button-photo').css('text-align', 'center');
            }

            if ($('#registered').length){
                containerFluid.css({
                    'min-height': wrapperForm.height() + 230
                })
            }

            if ($('#feedback').length){
                containerFluid.css({
                    'min-height': wrapperForm.height() + 230
                })
            }

            if(!device){

                $('.webcamButton').hide();
                $('.button-photo').css({
                    'text-align': 'center'
                });

            }
            $('#scroll').niceScroll();
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

            if( !device ){
                
                $('label.checkbox')
                    .off( 'click', checkboxClick )
                    .click( checkboxClick );

                $('label.checkbox a')
                .off( 'click', checkboxClickA )
                .click( checkboxClickA );

                $('.btn')
                    .off( 'click', buttonCLick )
                    .click( buttonCLick );
            }
            else{

                $('label.checkbox')
                    .hammer()
                    .on('tap', checkboxClick);  

                $('label.checkbox a')
                    .hammer()
                    .on('tap', checkboxClickA);

                $('.btn')
                    .hammer()
                     .on('tap', buttonCLick );
            }

            

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
            if( !device ){
                if ( date.length ) {
                    $.mask.definitions[ '1' ] = '[0-1]';
                    date.mask( '19' );
                }
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
            if(!$('html').is('.ie')){
                $( this )
                    .next( 'input:file' )
                    .click();
            }
                
    
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
            });
            
        }

        // init scroll rulles
        
        // API

        return {
            init: function() {
                $( init );

                $('#rulles').css({
                    'height' : '100%',
                })
                $('#rules').find('.wrapper-form p:last').css('margin-bottom', '300px');

                $('#scroll').niceScroll();

                if( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ) return;

                // $('.webcamButton').show(); 
                $('.button-photo').removeAttr('style');

                if($('#rules').length){
                    $('#rules').find('.wrapper-form p:last').css('margin-bottom', '0');
                    $('#rulles')
                        .css({
                            'height':'373px'
                        })
                        .mCustomScrollbar();
                }

                $('input[placeholder], textarea[placeholder]').placeholder();
                var marker = true;
                function scrollBar(){
                     if ( marker ) {
                            $(".ik_select_list_inner")
                                .mCustomScrollbar({
                                    advanced:{ updateOnContentResize: true },
                                    mouseWheel : true
                                });
                            marker = false;
                     }

                }   
                $('#month').ikSelect({
                        ddFullWidth : false,
                        autoWidth : false,
                        ddMaxHeight  :114,
                        ddCustomClass : 'regis',
                        onShow : scrollBar
                });

                if($('#registered').length){
                    $('.ik_select_link_text').text('Місяць');

                    $('.ik_select_option').click(function(){
                        var $this = $(this);
                      

                            setTimeout(function(){
                                $this.attr('title',$this.data('title'))

                                $('.ik_select_link_text').text($this.text())
                                $('select#month').val($this.attr('title'));

                            },10)

                        }).hover(function(){
                            $(this).data('title',$(this).attr('title'))
                                   .attr('title','');

                        },function(){

                             $(this).attr('title',$(this).data('title'));

                        });
                    }
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