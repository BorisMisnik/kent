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
        macreload: {

            chrome: {
                browser: 'safari',
                editor: 'webstorm'
            }
        }

            // todo: watch section
    });

    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-coffee' );
    grunt.loadNpmTasks( 'grunt-usemin' );
    grunt.loadNpmTasks( 'grunt-macreload' );

    //grunt.registerTask( 'default', [ 'less' ]);

    grunt.registerTask( 'default', [
        'coffee',
         'macreload'
    ]);

};