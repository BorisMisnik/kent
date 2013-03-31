define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.upload' );

        return Backbone.Layout.extend(
        {
            template: 'upload',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });