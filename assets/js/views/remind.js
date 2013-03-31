define(
    [
        'views/forms/init'
    ],
    function( form ) {
        console.log( 'app.remind' );

        return Backbone.Layout.extend(
        {
            template: 'remind',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });