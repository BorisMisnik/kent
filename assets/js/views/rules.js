define(
    [
        'views/forms/init',
        //'js!jquery142',
        'jquery.mousewheel',
        'js!jquery.mCustomScrollbar.min.js'
    ],
    function( form ) {
        Backbone.log( 'app.rules' );

        //var $142 = jQuery.noConflict();

        var Rules = Backbone.Layout.extend(
        {
            template: 'rules',
            afterRender: function() {
                // custom form fields
                form.init();
                // init scroll
//                require(
//                    'js!jScrollPane.js!order',
//                    function() {
//                        $142( '#rulles' ).jScrollPane({
//                            scrollbarWidth: 7,
//                            showArrows: false,
//                            resizeble : true
//                        });
//                    });
            }
        }),
        rules = new Rules();
        return rules;
    });