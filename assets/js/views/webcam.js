define(
    [
        'views/register',
        'views/forms/init',
        'js!swfobject!order'
    ],
    function( signup, form ) {
        Backbone.log( 'app.webcam' );

        var Webcam = Backbone.Layout.extend(
        {
            template: 'webcam',
            bitmap: '',

            afterRender: function() {
                // custom form fields
                form.init();

                // init flash
                var self = this,
                    flashvars = {},
                    params = {},
                    attributes = {};

                // embed
                swfobject.embedSWF(
                    '/js/libs/webcam/webcamShot.swf',
                    'flashContent',
                    '492', '342', '10.1.0',
                    '/swf/playerProductInstall.swf',
                    flashvars, params, attributes
                );
                // get bitmap
                window.putWebcamPhoto =
                    function( photoBase64 ) {
                        data = "data:image/jpeg;base64,"+ photoBase64;
                        // store
                        self.bitmap = data;
                        // store in signup form image
                        signup.setFile( 'webcam.jpg', data );
                    };
            }
        }),
        upload = new Webcam();
        return upload;
    });