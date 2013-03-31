/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
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
                    role: 'visitor'     // user, admin
                },

                // extend

                login: function( username, password, callback ) {
                    // query
                    this.log(
                        'Login:', username,
                        'password:', password );
                    $.post(
                        '/auth/login', {
                            username: username,
                            password: password
                        })
                        .fail( function( def, type, status ) {
                            Backbone.log( 'login ajax fail', status );
                            callback( true );
                        })
                        .done( function( res ) {
                            Backbone.log( 'login ajax done', res );
                            if ( res.error ) {
                                callback( null, null, res );
                            } else {
                                callback( null, res );
                            }
                        });
                }
            }),
            user = new User();

        return user;
    });