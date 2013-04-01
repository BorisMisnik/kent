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
                            console.log( 'remind results:', arguments );
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