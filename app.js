
/**
 * Module dependencies.
 */

var express = require( 'express' ),
    http = require( 'http' ),
    path = require( 'path' ),
    colors = require( 'colors' ),

    config = require( './config.json' ),
    port = process.env.PORT || config.port || 3000;

var app = express(),
    // http routes configuration file
    routes = require( './routes.json' );

app.configure( function() {
  app.set( 'port', port );
  app.use( express.favicon() );
  app.use( express.logger( 'default' ));
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'assets' )));
  app.use( express.static( path.join( __dirname, 'public' )));
});

app.configure( 'development', function() {
  app.use( express.errorHandler() );
});

console.log( '\nStarting server'.magenta.bold );

// Assign routes
for ( var id in routes ) {
    var route = Object( routes[ id ] || {} ),
        script = require( route.script ),
        handler = script && script[ route.handler ];

    // todo: Use `passport.js` for authorizing here

    // params
    if ( !route.url || !handler ) {
        console.log( 'Incorrect route '.red.bold, route );
        console.log( script, handler );
        continue;
    } else {
        console.log( 'Route', route.url );
    }

    // assign route
    app[ route.method ]( route.url, handler );
}

http.createServer( app )
    .listen( app.get( 'port' ),
    function() {
        console.log( String( 'Server listening on port ' + app.get( 'port' )).magenta.bold );
    });
