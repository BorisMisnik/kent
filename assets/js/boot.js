/*!
 * Application Bootstrap and Configurator
 *
 * @author Andjey Guzhovskiy, <me.the.ascii@gmail.com>
 * @copyright (c) 2013 Andjey Guzhovskiy
 * @licence CLOSED
 * @version 0.0.1
 */

define(
    'boot',
    [
        'js!backbone'
    ],
    function() {

        /**
         * Configuration
         */
        // todo: move to config.json and make curl.js json loader (!)
        var config = {
                log: {
                    local: true,
                    remote: {
                        // todo: debug-server
                        url: 'http://localhost:8080/logs/message'
                    }
                }
            };

        /**
         * Intialize
         */
        $( document).ready(
            function() {

                // initialize
                initMVC();

                // startup application
                curl(
                    // todo: config.json
                    // application
                    [ 'views/app' ],
                    // load handler
                    null,
                    // error handler
                    function( err ) {
                        // error
                        console.log( err.stack );
                        throw err;
                    });

            });

        /**
         * Init Backbone
         */
        function initMVC() {
            var extension = '.html',
                templates = {};

            // Templating

            /**
             * Preload and compile template
             */
            Backbone.Layout.configure({
                prefix: 'templates/',
                fetch: function( path ) {
                    // cache
                    if ( templates[ path ])
                        return templates[ path ];
                    // load
                    var done = this.async();
                    curl([ 'text!' + path + extension ],
                        function( contents ) {
                            templates[ path ] = Hogan.compile( contents );
                            done( templates[ path ]);
                        });
                },
                render: function( template, values ) {
                    return template.render( values );
                }
            });

            /**
             * Extend
             */

            // Logging
            Backbone.log = log;
            Backbone.Model.prototype.log = log;
            Backbone.Collection.prototype.log = log;
            Backbone.View.prototype.log = log;
            Backbone.Router.prototype.log = log;

            function log() {
                var args = [].slice.call( arguments ),
                    message;

                if ( JSON )
                    for ( var id in args )
                        if ( args.hasOwnProperty( id ))
                            args[ id ] = JSON.stringify( args[ id ]);

                message = args.join( ' ' );

                // console
                if ( config.log.local )
                    if ( console && console.log )
                        console.log( message );

                // todo: debug-server usage
                // todo: aggregate messages

//                // debug-server
//                if ( config.log.remote ) {
//                    // post client log message to the debug-server
//                    $.post(
//                        config.log.remote.url,
//                        { message: message },
//                        'json'
//                    );
//                }
            }
        }

    });
