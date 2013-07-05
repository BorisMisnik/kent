define(
    [
        // libs
        'router',
        'models/user',
        'models/person',
        'views/forms/init',
        // resources


        'js!jquery.selectbox-0.2.min.js',
        'js!swfobject!order',
        'js!libs/filereader/jquery.FileReader.min.js!order',
        'js!jquery.ikSelect.min.js'

    ],
    function( router, user, Person, form ) {
        Backbone.log( 'app.promo_register', arguments );

        var
            PromoRegister = Backbone.Layout.extend(
            {
                template: 'promo_register',
                events: {
                    // 'click .fileButton': nop,
                    'click .webcamButton': 'webcam',
                    'click .ok': 'submit'
                },
                model: null,
                person: null,

                initialize: function() {
                    var self = this;
                    this.model = new Backbone.Model();
                    this.person = new Person();
                },

                serialize: function( ) {
                    var data = this.model.toJSON();
                    data.values = this.person.toJSON();
                    this.log( 'signup data:', data );
                    return data;
                },
                afterRender: function() {
                    // custom form fields
                    form.init();
                },

                get: function() {
                    return this.person.toJSON();
                },
                save: function() {
                    this.model
                        .clear({ silent: true });
                    this.person
                        .clear({ silent: true })
                        .set({
                            name: this.$( '#name' ).val(),
                            day: this.$( '#date' ).val(),
                            month: this.$( '#month' ).val(),
                            year: this.$( '#year' ).val(),
                            phone: this.$( '#mobilePhone' ).val(),
                            email: this.$( '#email' ).val(),
                            password: this.$( '#password' ).val(),
                            password2: this.$( '#passwordTwo' ).val(),
                            agree_age: this.$( '#agree_age' ).prop( 'checked' ),
                            agree_rules: this.$( '#agree_rules' ).prop( 'checked' ),
                            agree_info: this.$( '#agree_info' ).prop( 'checked' ),
                            photo: this.photo.get( 'data' ) || ''
                        });
                },

                submit: function( e ) {
                    e.preventDefault();

                    var self = this,
                        form;

                    // values;
                    this.save();
                    form = self.get();
                    self.log( 'signup form:', form );

                    // request
                    user.signup(
                        form,
                        function( err, res, fail ) {
                            self.log( 'signup results:', arguments );
                            if ( err ) return;
                            if ( res.error ) {
                                // show error
                                self.model.set( 'errors', res );
                                self.render();
                            }
                            else {
                                self.model.clear({ silent: true });
                                // todo: save filtered values ( returned from server )
                                // show login
                                router.navigate( '#!/thanks', true );
                            }
                        });
                },
                leave: function( e ) {
                    this.log( 'leave signup form' );
                    e.preventDefault();
                    // reset form
                    this.model.clear({ silent: true });
                    // show login
                    router.navigate( '#!/login', true );
                }
            }),
            promo = new PromoRegister();
        return promo;
    });