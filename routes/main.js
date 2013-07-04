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

exports.index = function( req, res, next ) {
    isUserLogged( req,
        function( err, logged ) {
            // redirect logged users to the main page
            if ( logged ) res.redirect( config.pages.main );
            else next();
        });
};

/**
 * `main.html` available only for logged users
 *
 * @param req
 * @param res
 * @param next
 */
exports.main = function( req, res, next ) {
    isUserLogged( req,
        function( err, logged ) {

            // logged users allowed to view the main page
            if ( logged ) return next();
            // redirect unauthorized users to the login page
            res.redirect( config.pages.login );

//            // unauthorized session
//            if ( err
//                || '404' == responce.statusCode
//                || '401' == responce.statusCode )
//                res.redirect( '/' );
//            // user is logged
//            else next();
        });
};

function isUserLogged( req, callback ) {
    // pass user headers ( cookies and others )
    request.get(
        {
            url: config.service + '/user',
            headers: req.headers
        },
        function( err, responce, body ) {
            // parse body
            var result;
            try { result = JSON.parse( body ); }
            catch( e ) {}
            // user is logged
            if ( result && result.success ) return callback( null, true );
            callback( null, false );
        });
}