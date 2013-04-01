define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.register' );

        var Register = Backbone.Layout.extend(
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
        }),
        register = new Register();
        return register;
    });