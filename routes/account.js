/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var config = require( '../config.json' ),
    pipe = require( './../libs/pipe' ),
    request = require( 'request');

exports.login =
    function( req, res, next ) {
        // check is promo-login used
        var promo = isPromoLogin( req.body.username, req.body.password );
        // otherwise make default login action
        if ( !promo ) return next();
        // use promo login
        res.send({ success: { promo: true }});
    };

exports.logout =
    function( req, res ) {
        console.log( 'Logout:', req.session );
        pipe.request( 'GET', '/logout',
            { cookie: req.headers.cookie },
            function ( error, response, body) {
                res.redirect( '/' );
            });
    };

exports.signupPromo =
    function( req, res ) {
        console.log( 'Promo signup'.cyan.bold, req.body );
        // check is promo-login used
        var promo = isPromoLogin( req.body.promo_login, req.body.promo_password );
        // return error if not
        // because of signupPromo uses only for promo-logins
        if ( !promo ) return res.send({ error: { promo: true }});

        // make simple promo signup ( without photo upload needs )
        // prepare form data
        var form = req.body;
        delete form.promo_login;
        delete form.promo_password;
        // secret used to prevent direct call of promo-signup from unregistered user
        form.secret = config.promo_secret;

        pipe.request( 'POST', '/account/signup/promo',
            {
                form: form,
                cookie: req.header.cookie
            },
            function ( error, response, body ) {
                console.log( 'res', error, body );
                var result;
                try { result = JSON.parse( body ); }
                catch( e ) {}
                res.send( result );
            });
    };

// Helpers

function isPromoLogin( login, password ) {
    var found = null,
        credentials = [
            { "login": "49Oq7MgL",  "password": "2a1JOwl8" }
        ];
    // check for promo login
    if ( credentials && credentials.length ) {
        console.log( credentials );
        for ( var id in credentials ) {
            if ( credentials[ id ]
                && credentials[ id ].login == login
                && credentials[ id ].password == password ) {

                found = true;
                break;
            }
        }
    }
    return found;
}