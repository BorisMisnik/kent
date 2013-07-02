define(
    [
        'router',
        'models/user',
        'views/forms/init'

    ],
    function( router, user, form ) {
        Backbone.log( 'app.login' );

        var template = 'login';
        var main = '/main.html'
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            template = 'login-mobile';
            main = '/main-mobile.html'
        }
        
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
                template: template,
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

                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
             
                        var $ = document; 
                        var head  = $.getElementsByTagName('head')[0];
                        var link  = $.createElement('link');
                        link.rel  = 'stylesheet';
                        link.type = 'text/css';
                        link.href = '/css/login-mobile.css';
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
                                window.location.href = main;
                                //router.navigate( '/main.html' );
                                //self.log( 'goto: #!/main' );
                            }
                        });
                }
            }),
            login = new Login();
            return login;
    });