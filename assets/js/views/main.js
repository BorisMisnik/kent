define(
    [
        'views/forms/init',
        // custom
        'css!css/index.css',
        'css!css/jquery.mCustomScrollbar.css',
        'css!css/cutext.css',
        'css!css/ikSelect.css',
        'js!autoresize.jquery.js',
        'js!jScrollPane.js',
        'js!jquery.mousewheel.js',
        'js!cutext.js',
        'js!jquery.maskedinput.min.js',
        'js!jquery.easing.compatibility.js',
        'js!jquery.mCustomScrollbar.min.js',
        'js!TweenMax.min.js',
        'js!jquery.selectbox-0.2.min.js'
    ],
    function( form ) {
        Backbone.log( 'app.rules' );

        // preinit
        var marker = true;

        var Rules = Backbone.Layout.extend(
        {
            template: 'rules',
            afterRender: function() {
                // custom form fields
                form.init();

                // post init
                $( '.massege' )
                    .cuText({
                        scrollbarWidth : 7,
                        showArrows : false,
                        resizeble : false
                    });
                $('.smoke select')
                    .ikSelect({
                        ddFullWidth : false,
                        autoWidth : false,
                        ddMaxHeight  :114,
                        onShow : scrollBar
                    });
                $( '.text-wrapper .text' )
                    .mCustomScrollbar({
                        advanced:{ updateOnContentResize: true },
                        mouseWheel : true
                    });
                $( '.text h3' )
                    .off( 'click', onClickH )
                    .click( onClickH );
            }
        }),
        rules = new Rules();
        return rules;


        // Event Handlers

        function onClickH() {
            var $this = $(this);
            if(!$this.is('.open')){
                $this.addClass('open');
                $this.next().slideDown();
            }
            else{
                $this.removeClass('open');
                $this.next().slideUp();
            }
        }

        // Helpers

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

    });