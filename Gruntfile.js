module.exports = function(grunt) {

    var SRC_LESS = 'public/css/';
    var DEST_LESS = 'assets/css/';

    grunt.initConfig({
        less: {
            development: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'public/css/*.less',
                    dest: 'assets/css/',
                    ext: '.css'
                    //cwd: 'app/scripts'
                }]
            }

//            production: {
//                options: {
//                    paths: ["assets/css"],
//                    yuicompress: true
//                },
//                files: {
//                    "path/to/result.css": "path/to/source.less"
//                }
//            }
        },

        useminPrepare: {
            html: 'public/js/pack1.html'
        },

        usemin: {
            html: ['public/js/pack1.html']
        },

        coffee: {

            compile: {
                options: {
                    join: true //,bare : true,
                },
                files  : {
                    'public/js/packs.js': [
                        'public/coffee/misc.coffee',
                        'public/coffee/AssetsManager.coffee',
                        'public/coffee/views/PackSpiteSheet.coffee',
                        'public/coffee/views/PackComposition.coffee',
                        'public/coffee/app.coffee'
                     ]
                }
            }
        },

        concat: {
            tornado:{
                src: [
                    'public/js/preloadjs-0.3.1.min.js',
                    'public/js/easeljs-0.6.1.min.js',
                    'public/js/TweenMax.min.js',
                    'public/js/state-machine.min.js',
                    'public/js/packs.min.js'],
                dest: 'public/js/packs.min.js'
            }

        },

        uglify: {
            packs: {
                files: {
                    'public/js/packs.min.js': ['public/js/packs.js']
                }
            }
        },

        removelogging: {
            dist: {
                src: "public/js/packs.js",
                dest: "public/js/packs.js",

                options: {
                    // see below for options. this is optional.
                }
            }
        },

        macreload: {

            chrome: {
                browser: 'safari',
                editor: 'webstorm'
            }
        }

            // todo: watch section
    });

    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks( 'grunt-macreload' );
    grunt.loadNpmTasks("grunt-remove-logging");

    //grunt.registerTask( 'default', [ 'less' ]);

    grunt.registerTask( 'default', [
        'coffee',
        'uglify',
        'removelogging',
        'concat',
         'macreload'
    ]);

};



