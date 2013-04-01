define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.thanks' );

        var Thanks = Backbone.Layout.extend(
        {
            template: 'thanks',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        }),
        thanks = new Thanks();
        return thanks;
    });