
/**
 * Module dependencies.
 */

var express = require( 'express' ),
    http = require( 'http' ),
    path = require( 'path' ),
    config = require( './config.json' ),
    port = process.env.PORT || config.port || 3000;

var app = express();

app.configure( function() {
  app.set( 'port', port );
  app.use( express.favicon() );
  app.use( express.logger( 'dev' ));
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'public' )));
});

app.configure( 'development', function() {
  app.use( express.errorHandler() );
});

http.createServer( app )
    .listen( app.get( 'port' ),
    function() {
      console.log( "Server listening on port", app.get( 'port' ));
    });
