module.exports = function( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),

        compass: {
            compile: {
                options: {
                    sassDir: "src/scss",
                    cssDir: "src/css",
                    noLineComments: true
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [ "last 8 versions", "ie 8", "ie 9" ]
            },
            dist: {
                files: {
                    "dist/build.min.css": "dist/build.min.css"
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    "dist/build.min.css": [
                        "node_modules/normalize.css/normalize.css",
                        "node_modules/magnific-popup/dist/magnific-popup.css",
                        "node_modules/fotorama/fotorama.css",
                        "src/css/*.css"
                    ]
                }
            }
        },

        watch: {
            css: {
                files: [ "src/scss/*.scss" ],
                tasks: [ "compass", "cssmin" ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: "src/js/*.js",
                tasks: [ "concat", "uglify" ],
                options: {
                    debounceDelay: 250
                },
            }
        },

        concat: {
            options: {
                separator: ";\n",
            },
            dist: {
                src: [
                    // libs
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
                    "node_modules/fotorama/fotorama.js",

                    // app
                    "src/js/app.js"
                ],
                dest: "dist/build.js",
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
            "dist/build.js",
            "src/css"
        ]

    } );

    grunt.loadNpmTasks( "grunt-contrib-compass" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );
    grunt.loadNpmTasks( "grunt-autoprefixer" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );

    grunt.registerTask( "default", [ "watch" ] );
    grunt.registerTask( "prod", [ "compass", "cssmin", "autoprefixer", "concat", "uglify", "clean" ] );

};