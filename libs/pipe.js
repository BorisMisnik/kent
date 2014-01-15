/*!
 * Module: Module
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

var config = require( '../config.json' ),
    request = require( 'request'),
    colors = require( 'colors' );

module.exports =
    function( req, res, url, params ) {

        //console.log( 'PIPE:'.green.bold, req.url, req.headers, req.body, params );
        var args = [].slice.call( arguments ),
            method = ( req.method || '' ).toLowerCase(),
            action = request[ method ],
            params = params || {};

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        var j = request.jar();
        var cakes = String( req.headers.cookie ).split( '; ' );
        // add each client cookie
        cakes.forEach( function( cake ) {
            var cookie = request.cookie( cake );
            j.add( cookie );
        });

        // pass session and form
        var x = action(
            config.service + ( url || req.url ),
            {
                headers: params.headers, // || { cookie: req.headers.cookie },
                jar: j,
                form: params.form || req.body
            }).pipe( res );

        x.on( 'error', function( err ) {
            console.log( 'Pipe error:'.red.bold, err );
        });

        //req.pipe( res );
//        req.pipe( x );
//        x.pipe( res );
//        return x;
    };

module.exports.request =
    function( method, url, params, callback ) {

        console.log( 'PIPE REQUEST:'.green.bold, method, config.service + url );
        var args = [].slice.call( arguments, 2 ),
            action = request[ String( method ).toLowerCase() ];

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        // clear cookies
        var j = request.jar();

        // add custom cookies
        if ( params.cookie ) {
            var cakes = String( params.cookie ).split( '; ' );
            // add each client cookie
            cakes.forEach( function( cake ) {
                var cookie = request.cookie( cake );
                // if(  j.hasOwnProperty('add') )
                    j.setCookie( cookie );
            });
        }

        // make request
        var x = action.call( this,
            config.service + url,
            {
                jar: j,
                headers: params.headers,
                form: params.form
            },
            callback );

        // handle errors
        x.on( 'error', function( err ) {
            console.log( 'Request error:'.red.bold, err );
        });

        // return request object
        return x;

//        return action.apply( this,
//            [ config.service + url ].concat( args ));
    };