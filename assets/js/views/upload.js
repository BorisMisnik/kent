define(
    [
        'views/forms/init'
    ],
    function( form ) {
        Backbone.log( 'app.upload' );

        var Upload = Backbone.Layout.extend(
        {
            template: 'upload',
            afterRender: function() {
                // custom form fields
                form.init();
            }
        }),
        upload = Upload;
        return upload;
    });