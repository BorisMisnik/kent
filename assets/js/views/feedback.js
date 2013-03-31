define(
    [
        'views/forms/init',
        'jquery.mousewheel',
        'js!cutext.js',
        'js!autoresize.jquery.js'
    ],
    function( form ) {
        console.log( 'app.feedback' );

        $( document ).ready( function() { });

        return Backbone.Layout.extend(
        {
            template: 'feedback',
            afterRender: function() {
                // custom form fields
                form.init();
                // init scroll and text
                require(
                    'js!jScrollPane.js!order',
                    function() {
                        $('#massege')
                            .cuText({
                                scrollbarWidth : 7,
                                showArrows : false,
                                resizable : false
                            });
                    });
            }
        });

    });