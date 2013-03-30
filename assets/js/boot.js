/*!
 * Module: Module
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

//                    $.get( path + extension,
//                        function( contents ){
//                            done( Hogan.compile( contents ));
//                        }, 'text' );
                },
                render: function( template, values ) {
                    return template.render( values );
                }
            });
        }

    });
