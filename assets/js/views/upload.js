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

                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
             
                    var $ = document; 
                    var head  = $.getElementsByTagName('head')[0];
                    var link  = $.createElement('link');
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = '/css/register-mobile.css';
                    head.appendChild(link);

                    function script(filename){
                        var fileref = $.createElement('script');
                        fileref.type = 'text/javascript'
                        fileref.src=  '/js/' + filename;
                        head.appendChild(fileref);
                    }

                    script('iscroll-lite.js');
                    script('jquery.hammer.min.js');
                    script('background-mobile.js');
                    script('mobile-js.js');
                }

            }
        }),
        upload = new Upload();
        return upload;
    });