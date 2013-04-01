define(
    [
        'views/forms/init',
        'js!jquery142',
        'jquery.mousewheel'
    ],
    function( form ) {
        Backbone.log( 'app.rules' );

        debugger;
        var $142 = jQuery.noConflict();
//        require( 'js!jquery142', function() {
//            jQuery.noConflict();
//        });


        var Rules = Backbone.Layout.extend(
        {
            template: 'rules',
            afterRender: function() {
                // custom form fields
                form.init();
                // init scroll
                require(
                    'js!jScrollPane.js!order',
                    function() {
                        $142( '#rulles' ).jScrollPane({
                            scrollbarWidth: 7,
                            showArrows: false,
                            resizeble : true
                        });
                    });
            }
        }),
        rules = new Rules();
        return rules;
    });