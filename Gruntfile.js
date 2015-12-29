module.exports = function( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),

        concat: {
            css: {
                src: [ "src/scss/*.scss" ],
                dest: "dist/build.scss"
            },
            js: {
                src: [
                    // libs
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
                    "node_modules/fotorama/fotorama.js",
                    "node_modules/icheck/icheck.min.js",
                    "node_modules/selectize/dist/js/standalone/selectize.min.js",
                    "src/js/libs/zoomsl-3.0.min.js",

                    // app
                    "src/js/utils/carousel.js",
                    "src/js/utils/switcher.js",
                    "src/js/app.js"
                ],
                dest: "dist/build.js"
            }
        },

        sass: {
            dist: {
                files: {
                    "dist/build.css": "dist/build.scss"
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [ "last 8 versions", "ie 8", "ie 9" ]
            },
            dist: {
                files: {
                    "dist/build.css": "dist/build.css"
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },
            target: {
                files: {
                    "dist/build.min.css": [
                        "node_modules/normalize.css/normalize.css",
                        "node_modules/magnific-popup/dist/magnific-popup.css",
                        "node_modules/fotorama/fotorama.css",
                        "node_modules/icheck/skins/minimal/aero.css",
                        "node_modules/selectize/dist/css/selectize.css",
                        "dist/build.css"
                    ]
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    "dist/build.min.js": [ "dist/build.js" ]
                }
            }
        },

        clean: [
            "dist/build.scss",
            "dist/build.css",
            "dist/build.js"
        ],

        watch: {
            css: {
                files: [ "src/scss/*.scss" ],
                tasks: [ "concat:css", "sass", "cssmin" ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: [ "src/js/*.js", "src/js/utils/*.js" ],
                tasks: [ "concat:js" ],
                options: {
                    debounceDelay: 250
                }
            }
        }

    } );

    grunt.loadNpmTasks( "grunt-sass" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );
    grunt.loadNpmTasks( "grunt-autoprefixer" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );

    grunt.registerTask( "default", [ "concat:css", "sass", "cssmin", "concat:js", "watch" ] );
    grunt.registerTask( "prod", [ "concat:css", "sass", "autoprefixer", "cssmin", "concat:js", "uglify", "clean" ] );
};