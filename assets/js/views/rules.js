define(
    [
        'views/forms/init',
        'jquery.mousewheel'
    ],
    function( form ) {
        Backbone.log( 'app.rules' );

        return Backbone.Layout.extend(
        {
            template: 'rules',
            afterRender: function() {
                // custom form fields
                form.init();
                // init scroll
                require(
                    'js!jScrollPane.js!order',
                    function() {
//                        $( '#rulles' ).jScrollPane({
//                            scrollbarWidth: 7,
//                            showArrows: false,
//                            resizeble : true
//                        });
                    });
            }
        });

    });