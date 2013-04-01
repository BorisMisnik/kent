define(
    [
        'views/forms/init',
        'js!jquery.mousewheel.js',
        'js!cutext.js',
        'js!autoresize.jquery.js'
    ],
    function( form ) {
        Backbone.log( 'app.feedback' );

        var Feedback = Backbone.Layout.extend(
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
        }),
        feedback = new Feedback();
        return feedback;
    });