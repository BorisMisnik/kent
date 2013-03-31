define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.thanks' );

        return Backbone.Layout.extend(
        {
            template: 'thanks',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });