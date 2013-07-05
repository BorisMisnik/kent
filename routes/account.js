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
    request = require( 'request' );

exports.login =
    function( req, res, next ) {
        var found = null,
            credentials = config.promo;

        debugger;
        // check for promo login
        if ( credentials && credentials.length ) {
            for ( var id in credentials ) {
                if ( credentials[ id ]
                    && credentials[ id ].login == req.body.username
                    && credentials[ id ].password == req.body.password ) {
                    found = true;
                    break;
                }
            }
        }
        // make default login action
        if ( !found ) return next();
        // promo login
        req.session.promo = true;
        //res.redirect( config.pages.promo );
        res.send({ success: { promo: true }});
    };

exports.logout =
    function( req, res ) {
        console.log( 'Logout:', req.session );
        pipe.request( 'get', '/logout', { headers: req.headers },
            function ( error, response, body) {
                req.session.destroy();
                res.redirect( '/' );
            });
    };
