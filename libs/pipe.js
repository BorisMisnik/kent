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
        console.log( 'PIPE:'.green.bold, req.url, req.headers, req.body );
        var args = [].slice.call( arguments ),
            method = ( req.method || '' ).toLowerCase(),
            action = request[ method ],
            params = params || {};

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        // pass session and form
        var x = action(
            config.service + ( url || req.url ),
            {
                headers: params.headers || req.headers,
                form: params.form || req.body
            });

        x.on( 'error', function( err ) {
            console.log( 'Pipe error:'.red.bold, err );
        });

        //req.pipe( res );
        req.pipe( x );
        x.pipe( res );
        return x;
    };

module.exports.request =
    function( method, url ) {
        console.log( 'PIPE REQUEST:'.green.bold, method, url );
        var args = [].slice.call( arguments, 2 ),
            action = request[ method ];

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        return action.apply( this,
            [ config.service + url ].concat( args ));
    };