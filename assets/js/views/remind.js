define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.remind' );

        var Remind = Backbone.Layout.extend(
        {
            template: 'remind',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        }),
        remind = Remind;
        return remind;
    });