/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var pipe = require( './pipe' ),
    request = require( 'request' );

exports.login =
    function( req, res ) {
        console.log( 'Login:', req.body );
        pipe( req, res,
            '/account/login',
            { form: req.body }
        );
    };

exports.logout =
    function( req, res ) {
        console.log( 'Logout:', req.session );

        pipe.request( 'get', '/account/logout',
            function ( error, response, body) {
                res.redirect( '/' );
            });
    };

exports.remind =
    function( req, res ) {
        console.log( 'Remind:', req.body );
        pipe( req, res,
            '/account/remind',
            { form: req.body }
        );
    };