define(
    [
        'views/forms/init',
        'jquery.mousewheel'
    ],
    function( form ) {
        console.log( 'app.rules' );

        $( document ).ready( function() { });

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