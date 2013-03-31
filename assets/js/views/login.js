define(
    [
        'models/user',
        'views/forms/init'
    ],
    function( user, form ) {
        Backbone.log( 'app.login' );

        var Model = Backbone.Model.extend({
                defaults: {
                    username: '',
                    password: ''
                }
            }),
            errorMessages = {
                wrong_credentials: 'Неправильно введено логін або пароль. Спробуй ще раз.'
            };

        return Backbone.Layout.extend(
        {
            template: 'login',
            events: {
                'click #submitLogin': 'login'
            },
            model: new Model(),

            initialize: function() {
            },

            serialize: function() {
                // prepare errors
                var data = { errors: [] };
                _.each( this._errors,
                    function( val, key ) {
                        data.errors.push(
                            errorMessages[ key ]);
                    });
                // form values
                data.form = this.model.toJSON();
                this.log( 'data:', data );
                return data;
            },
            beforeRender: function() {
            },
            afterRender: function() {
                // custom form fields
                form.init();
            },

            _errors: {},

            login: function( e ) {
                e.preventDefault();

                // values
                var self = this,
                    username = self.$( '#username' ).val(),
                    password = self.$( '#password' ).val();
                self.model
                    .set( 'username', username )
                    .set( 'password', password );
                self._errors = {};

                // query
                user.login(
                    username, password,
                    function( err, res, fail ) {
                        if ( err ) return;
                        if ( fail
                            || !res
                            || !res.authorized ) {
                            // show error
                            self._errors = fail;
                            self.render();
                        }
                        else {
                            // router.navigate( '#!/main' );
                            self.log( 'goto: #!/main' );
                        }
                    });
            }


        });

    });