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
        Backbone.log( 'app.register', arguments );

        var
            Image = Backbone.Model.extend({
                // (c) http://stackoverflow.com/questions/8171562/backbone-form-with-file-upload-how-to-handle
                readFile: function( file ) {
                    var reader = new FileReader();
                    // closure to capture the file information.
                    reader.onload = (function(theFile,that) {

                        return function(e) {
                            //set model

                            that.set({
                                filename: theFile.name,
                                data: e.target.result
                            });
                        };
                    })( file, this );
                    // base64
                    reader.readAsDataURL(file);
                },

                setFile: function( name, base64 ) {
                    // todo: validate args
                    this.set({
                        filename: name,
                        data: base64
                    })
                }
            }),

            nop = function() { return false },

            Register = Backbone.Layout.extend(
            {
                template: 'register',
                events: {
                    // 'click .fileButton': nop,
                    'click .webcamButton': 'webcam',
                    'click .ok': 'submit'
                },
                model: null,
                person: null,
                photo: null,

                initialize: function() {
                    var self = this;

                    this.model = new Backbone.Model();
                    this.person = new Person();
                    this.photo = new Image();
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

                    // setup FileReader
                    if ( this.$().fileReader )
                        this.$( '.fileButton' )
                            .fileReader({
   
                                filereader: '/js/libs/filereader/filereader.swf',
                                expressInstall: '/js/libs/flash/expressInstall.swf',
                                debugMode: false,
                                callback: function(evt) {
                                    Backbone.log( 'FileReader shim is ready (ie)' );

                                     $('.fileButton').on('change', loadImages); // вешаем событие на загрузку файла
                                   
                                },
                                extensions: '*.jpg;*.png'
                            });

                            function loadImages(evt){ 
                                var file = evt.target.files[0];

                                if ( !file.type.match( 'image.*' )) return;
                                if ( !file ) return;
                                
                                self.photo.readFile( file );
                            };


                    var self = this;
                    this.$( '#photofile' )
                        .on( 'change', function( e ) {

                            // (c) http://www.html5rocks.com/en/tutorials/file/dndfiles/
                            // (c) http://stackoverflow.com/questions/8171562/backbone-form-with-file-upload-how-to-handle

                            var file = e.target.files[ 0 ];
                            // checks
                            if ( !file ) return;

                            if ( !file.type.match( 'image.*' )) return;
                            self.photo.readFile( file );

                        });
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
                            agree_age: !! this.$( '#agree_age' ).attr( 'checked' ),
                            agree_rules: !! this.$( '#agree_rules' ).attr( 'checked' ),
                            agree_info: !! this.$( '#agree_info' ).attr( 'checked' ),
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
                },

                webcam: function( e ) {
                    this.save();
                    router.navigate( '#!/webcam', true );
                }

            }),
            register = new Register();
        return register;
    });