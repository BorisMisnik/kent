define(
    [
        'router',
        'models/user',
        'views/forms/init'
    ],
    function( router, user, form ) {
        Backbone.log( 'app.login' );

        var errors = {
                wrong_credentials: 'Неправильно введено логін або пароль. Спробуй ще раз.',
                not_activated: 'Ваш аккаунт не активовано. Спробуй пізніше.'
            },

            Model = Backbone.Model.extend({
                defaults: {
                    username: '',
                    password: '',
                    remember: false
                    // todo: remember me
                }
            }),

            Login = Backbone.Layout.extend(
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
                            data.errors.push( errors[ key ]);
                        });
                    // form values
                    data.form = this.model.toJSON();
                    this.log( 'login form data:', data );
                    return data;
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
                        password = self.$( '#password' ).val(),
                        remember = 'checked' == self.$( '#remember' ).attr( 'checked' );
                    self.model
                        .set( 'username', username )
                        .set( 'password', password );
                    self._errors = {};

                    // query
                    user.login(
                        username, password, remember,
                        function( err, res, fail ) {
                            if ( err ) return;
                            if ( fail
                                || !res
                                || !res.success ) {
                                // show error
                                self._errors = fail;
                                self.render();
                            }
                            else {
                                if ( res.success.promo ) {
                                    // window.location.href = '/promo.html';
                                    router.navigate( '#!/promo_register', true );
                                } 
                                else{
                                    if ( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/) ){
                                        window.location.href = '/main-mobile.html';
                                    }
                                    else {
                                        window.location.href = '/main.html';
                                    }
                                }
                                   
                                
                                //router.navigate( '/main.html' );
                                //self.log( 'goto: #!/main' );
                            }
                        });
                }
            }),
            login = new Login();
            return login;
    });