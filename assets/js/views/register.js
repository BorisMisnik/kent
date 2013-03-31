define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.register' );

        return Backbone.Layout.extend(
        {
            template: 'register',
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