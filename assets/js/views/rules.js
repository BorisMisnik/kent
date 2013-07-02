define(
    [
        'views/forms/init',
        //'js!jquery142',
        'js!jquery.mousewheel.js',
        'js!jquery.mCustomScrollbar.min.js'
    ],
    function( form ) {
        Backbone.log( 'app.rules' );
        var template = 'rules';

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ){
            template = 'rules-mobile';
        }
        //var $142 = jQuery.noConflict();

        var Rules = Backbone.Layout.extend(
        {
            template: template,
            afterRender: function() {
                // custom form fields
                // init scroll
                form.init();

                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ){
                
                    var $ = document; 
                    var head  = $.getElementsByTagName('head')[0];
                    var link  = $.createElement('link');
                    var link2 = $.createElement('link');
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = '/css/rules-mobile.css';
                    head.appendChild(link);

                    link2.rel  = 'stylesheet';
                    link2.type = 'text/css';
                    link2.href = '/css/idangerous.swiper.css';
                    head.appendChild(link2);
                   
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
        rules = new Rules();
        return rules;
    });