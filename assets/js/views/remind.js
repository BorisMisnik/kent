define(
    [
        'router',
        'models/user',
        'views/forms/init'
    ],
    function( router, user, form ) {
        Backbone.log( 'app.remind' );

        var
            Remind = Backbone.Layout.extend(
            {
                template: 'remind',
                events: {
                    'click .leave': 'leave',
                    'click .send': 'submit',
                    'click .ok': 'leave'
                },
                model: new Backbone.Model(),

                initialize: function() {},

                serialize: function( ) {
                    this.log( 'remind form data:', this.model.toJSON() );
                    return this.model.toJSON();
                },
                afterRender: function() {
                    // custom form fields
                    form.init();
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
             
                        var $ = document; 
                        var head  = $.getElementsByTagName('head')[0];
                        var link  = $.createElement('link');
                        link.rel  = 'stylesheet';
                        link.type = 'text/css';
                        link.href = '/css/remind-mobile.css';
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
                },

                submit: function( e ) {
                    e.preventDefault();

                    // values
                    var self = this,
                        email = self.$( '#email' ).val();
                    this.model
                        .clear({ silent: true })
                        .set( 'email', email );

                    self.log( 'remind email', email );

                    user.remind(
                        email,
                        function( err, res, fail ) {
                            self.log( 'remind results:', arguments );
                            if ( err ) return;
                            if ( res.error ) {
                                // show error
                                self.model.set( 'errors', res );
                                self.render();
                            }
                            else {
                                self.model
                                    .set( 'success', true );
                                self.render();

                            }
                        });
                },
                leave: function( e ) {
                    this.log( 'leave remind form' );
                    e.preventDefault();
                    // reset form
                    this.model.clear({ silent: true });
                    // show login
                    router.navigate( '#!/login', true );
                }

            }),
            remind = new Remind();

        return remind;
    });