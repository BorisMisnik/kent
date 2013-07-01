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

    request.get( config.service + '/user',
        function( err, responce, body ) {
            // parse body
            var result;
            try { result = JSON.parse( body ); }
            catch( e ) {}
            // user is logged
            if ( result && result.success ) return next();
            // unauthorized session
            res.redirect( '/' );

//            // unauthorized session
//            if ( err
//                || '404' == responce.statusCode
//                || '401' == responce.statusCode )
//                res.redirect( '/' );
//            // user is logged
//            else next();
        });
};