define(
    [
        'views/forms/init'
    ],
    function( form ) {
        console.log( 'app.thanks' );

        $( document ).ready( function() { });

        return Backbone.Layout.extend(
        {
            template: 'thanks',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });