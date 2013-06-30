/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var config = require( '../config.json' ),
    request = require( 'request' );

/**
 * `main.html` available only for logged users
 *
 * @param req
 * @param res
 * @param next
 */
exports.main = function( req, res, next ) {

    request.get( config.service + '/account',
        function( err, responce, body ) {
            debugger;
            // unauthorized session
            if ( err
                || '404' == responce.statusCode
                || '401' == responce.statusCode )
                res.redirect( '/' );
            // user is logged
            else next();
        });
};