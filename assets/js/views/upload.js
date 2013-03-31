define(
    [
        'views/forms/init'
    ],
    function( form ) {
        console.log( 'app.upload' );

        $( document ).ready( function() { });

        return Backbone.Layout.extend(
        {
            template: 'upload',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        });

    });