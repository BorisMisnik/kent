/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var pipe = require( './../libs/pipe' ),
    request = require( 'request' );

exports.logout =
    function( req, res ) {
        console.log( 'Logout:', req.session );

        pipe.request( 'get', '/logout', { headers: req.headers },
            function ( error, response, body) {
                res.redirect( '/' );
            });
    };
