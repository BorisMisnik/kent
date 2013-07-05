/*!
 * Module: Module
 */

// singleton

define(
    [],
    function() {

        var User = Backbone.Model.extend({
                defaults: {
                    authorized: false,
                    session: '',
                    user: '',
                    role: 'visitor',    // user, admin
                    // save entered credentials
                    username: '',
                    password: ''
                },

                // extend

                isAutorized: function() {
                    return this.authorized
                },

                login: function( username, password, remember, callback ) {
                    this.log( 'Login:', username, 'password:', password, 'remember:', remember );
                    // args
                    if ( 'function' == typeof remember )
                        var callback = remember,
                            remember = undefined;
                    // query
                    var request = {
                        username: username,
                        password: password
                    };
                    if ( remember ) request.remember_me = true;

                    // save credentials
                    this.set( 'username', username );
                    this.set( 'password', password );

                    // ajax
                    $.post( '/login', request )
                        .fail( function( def, type, status ) {
                            Backbone.log( 'login: ajax fail', status );

                            // unauthorized
                            if ( status == 'Unauthorized' )
                                return callback( null, null, {
                                    errors: true,
                                    wrong_credentials: true
                                });
                            // other errors
                            callback( new Error( status ));
                        })
                        .done( function( res ) {
                            Backbone.log( 'login: ajax done', res );

                            if ( res.error )
                                return callback( null, null, res );

                            callback( null, res );
                        });
                },

                logout: function( callback ) {
                    $.get( '/logout' )
                        .fail( function( def, type, status ) {
                            Backbone.log( 'logout: ajax fail', status );
                            if ( status == 'Unauthorized' )
                                return callback( null, null, {
                                    errors: true,
                                    unauthorized: true
                                });
                        })
                        .done( function( res ) {
                            Backbone.log( 'logout: ajax success', res );
                            if ( res.error )
                                return callback( null, null, res );
                            callback( null, res );
                        });
                },



                remind: function( email, callback ) {
                    $.post(
                        '/account/remind', {
                            email: email
                        })
                        .fail( function( def, type, status ) {
                            Backbone.log( 'remind password: ajax fail', status );
                            callback( new Error( status ));
                        })
                        .done( function( res ) {
                            Backbone.log( 'remind password: ajax done', res );
                            callback( null, res );
                        });
                },

                signup: function( form, callback ) {
                    $.post(
                        '/account/signup',
                        Object( form ))
                        .fail( function( def, type, status ) {
                            Backbone.log( 'signup: ajax fail', status );
                            callback( new Error( status ));
                        })
                        .done( function( res ) {
                            Backbone.log( 'signup: ajax done', res );
                            callback( null, res );
                        });
                },

                signupPromo: function( form, callback ) {
                    $.post(
                        '/account/signup/promo',
                        Object( form ))
                        .fail( function( def, type, status ) {
                            Backbone.log( 'signup: ajax fail', status );
                            callback( new Error( status ));
                        })
                        .done( function( res ) {
                            Backbone.log( 'signup: ajax done', res );
                            callback( null, res );
                        });
                }

            }),
            user = new User();

        return user;
    });