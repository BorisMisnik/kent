/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var config = require( '../config.json' ),
    //request = require( 'request'),
    pipe = require( '../libs/pipe' ),
    fs = require( 'fs' ),
    unsibscriber = false;

exports.index = function( req, res, next ) {
    isUserLogged( req,
        function( err, logged ) {
            // redirect logged users to the main page
            if ( logged && !unsibscriber ) res.redirect( config.pages.main );
            else next();
        });
};

/**
 * Register by using promo-code
 * @param req
 * @param res
 * @param next
 */

exports.promo =
    function( req, res, next ) {
        if ( !req.session.promo ) return res.send( 403 );
        // show page
        next();
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

/**
 * Redirect over site-application routes, see `/assets`
 * @param req
 * @param res
 * @param next
 */
exports.go = function( req, res, next ) {
    console.log( 'path:', __dirname + '../assets/index.html' );
    fs.readFile( __dirname + '/../assets/index.html',
        function( err, body ) {
            console.log( arguments );
            //if ( err ) return res.redirect( '/' );
            res.send( body.toString( 'utf-8' ));
        })
};

exports.unsibscriber = function(req, res){
    unsibscriber = true;
    res.redirect('/#!/unsibscriber');
}

// Helpers

function isUserLogged( req, callback ) {
    // pass user headers ( cookies and others )
    console.log( 'isUserLogged', config.service + '/user', req.headers );
    console.log( config.service );
    console.log( req.headers );
    // pipe with cookies

//    var j = request.jar();
//    var cakes = String( req.headers.cookie ).split( '; ' );
//    // add each client cookie
//    cakes.forEach( function( cake ) {
//        var cookie = request.cookie( cake );
//        j.add( cookie );
//    });
//
//    // make request
//
//    request(
//        {
//            method: 'GET',
//            url: config.service + '/user',
//            jar: j
//        },

    pipe.request(
        'GET', '/user',
        {
            cookie: req.headers.cookie
        },
        function( err, responce, body ) {
            console.log( 'isUserLogged result', body );
            // parse body
            var result;
            try { result = JSON.parse( body ); }
            catch( e ) {}
            // user is logged
            if ( result && result.success ) return callback( null, true );
            callback( null, false );
        });
}