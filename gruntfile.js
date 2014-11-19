module.exports = function (grunt) {

    grunt.registerTask('default', [ 'demo' ]);

    grunt.registerTask('demo', [
        'jshint',
        'clean:demo',
        'browserify:demo',
        'http-server:demo',
        'watch:demo',
        'clean:demo'
    ]);

    grunt.registerTask('publish-pages', [
        'jshint',
        'clean:demo',
        'browserify:demo',
        'gh-pages',
        'clean:demo'
    ]);
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            githubPages: {
                base: 'demo',
                files: [ 'index.html', 'demo.bundle.js', 'base.css' ]
            },
            demo: {
                server: {
                    port: process.env.PORT || 8080,
                    host: process.env.IP || '127.0.0.1'
                },
                dir: 'demo',
                files: [
                    'demo/index.js',
                    'demo/index.html'
                ],
                js: {
                    index: 'demo/index.js',
                    bundle: 'demo/demo.bundle.js'
                }
            },
            src: {
                js: {
                    dir: '.',
                    files: [
                        'app.js',
                        'mods/**/*.js'
                    ],
                    index: 'app.js'
                },
                tpl: {
                    files: [
                        'mods/**/*.tpl'
                    ]
                }
            },
            spec: {
                dir: 'test',
                bundle: 'test/<%= pkg.name %>.bundle.js',
                files: 'test/**/*.spec.js'
            }
        },
        clean: {
            demo: [ '<%= config.demo.js.bundle %>' ]
        },
        browserify: {
            options: {
                transform: [ 'brfs' ],
                browserifyOptions: {
                    debug: true
                }
            },
            demo: {
                files: [{
                    src: '<%= config.demo.js.index %>',
                    dest: '<%= config.demo.js.bundle %>'
                }]
            }
        },
        watch: {
            demo: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.src.js.files %>',
                    '<%= config.src.tpl.files %>',
                    '<%= config.demo.files %>'
                ],
                tasks: [
                    'jshint',
                    'clean:demo',
                    'browserify:demo'
                ]
            }
        },
        jshint: {
            files: [
                'gruntfile.js',
                '<%= config.spec.files %>',
                '<%= config.src.js.files %>'
            ]
        },
        'http-server': {
            demo: {
                root: '.',
                port: '<%= config.demo.server.port %>',
                host: '<%= config.demo.server.host %>',
                cache: -1,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            }
        },
        'gh-pages': {
            options: {
                base: '<%= config.githubPages.base %>'
                },
            src: '<%= config.githubPages.files %>'
        }
    });

    require('load-grunt-tasks')(grunt);

};
