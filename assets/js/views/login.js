define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.login' );

        return Backbone.Layout.extend(
        {
            template: 'login',
            serialize: function() {
                return { name: 'a123' };
            },
            initialize: function() {
            },
            beforeRender: function() {
            },
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });