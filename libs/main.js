/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var auth = require( './login' );

/**
 * `main.html` available only for logged users
 *
 * @param req
 * @param res
 * @param next
 */
exports.main = function( req, res, next ) {
    var id = req.session.uid,
        user = auth.users[ id ];
    console.log( 'main:', id, user );
    if ( !user )
        res.send( 403 );
    else
        next();
};