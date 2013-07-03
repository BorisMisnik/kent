define(
    [
        'views/forms/init',
        'js!jquery.mousewheel.js',
        'js!cutext.js',
        'js!autoresize.jquery.js'
    ],
    function( form ) {
        Backbone.log( 'app.feedback' );

        var Feedback = Backbone.Layout.extend(
        {
            template: 'feedback',
            model: null,
            events: {
                'click .submit': 'submit'
            },

            initialize: function() {
                this.model = new Backbone.Model();
            },

            serialize: function( ) {
                this.log( 'feedback data:', this.model.toJSON() );
                return this.model.toJSON();
            },
            afterRender: function() {
                // custom form fields
                form.init();
                // init scroll and text

            },

            submit: function( e ) {
                e.preventDefault();

                // values
                var self = this,
                    form = {
                        email: this.$( '#email' ).val(),
                        name: this.$( '#name' ).val(),
                        message: this.$( '#massege' ).val()
                    };

                self.model
                    .clear({ silent: true })
                    .set( form );
                self.log( 'feedback form:', form );

                $.post(
                    '/feedback', form )
                    .done( function( res ) {
                        self.log( 'feedback. ajax results:', res);
                        if ( res.error ) {
                            // show error
                            self.model.set( 'errors', res );
                            self.render();
                        } else {
                            self.model.clear({ silent: true });
                            // go back
                            history.back();
                        }
                    })
                    .fail( function( def, type, status ) {
                        self.log( 'feedback. ajax error:', status );
                    });
            }
        }),
        feedback = new Feedback();
        return feedback;
    });