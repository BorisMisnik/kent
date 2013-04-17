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

module.exports =
    function(  req, res, uri, params ) {
        var args = [].slice.call( arguments ),
            method = ( req.method || '' ).toLowerCase(),
            action = request[ method ];

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        var x = action( config.service + uri, params || {} );
        req.pipe( x );
        x.pipe( res );

        return x;
    };

module.exports.request =
    function( method, url ) {
        var args = [].slice.call( arguments, 2 ),
            action = request[ method ];

        if ( !action )
            throw new Error( 'No `request` action:' + action );

        return action.apply( this,
            [ config.service + url ].concat( args ));
    };