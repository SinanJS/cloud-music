// var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
// var mountFolder = function (connect, dir) {
//     return connect.static(require('path').resolve(dir));
// };
// var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-connect-proxy');
    //任务配置，所有插件的配置信息
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/controllers/*.js'],
                dest: 'src/js/controllers.js'
            }
        },
        clean: {
            build: {
                src: ["./build/**/*", "!./build/lib/bootstrap-3.3.5/*"],
                filter: "isFile"
            }
        },
        //uglify插件的配置信息
        uglify: {
            //“options”中规定允许生成的压缩文件带banner，
            //即在生成的压缩文件第一行加一句话说明。
            //注意，其中使用到了pkg获取package.json的内容。
            options: {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //　“build”中配置了源文件和目标文件。
            //　即规定了要压缩谁？压缩之后会生成谁？
            //　注意，我们这里将目标文件的文件名通过pkg的name和version来命名。
            build: {
                src: 'src/js/*.js',
                dest: 'build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'

            }
        },
        //jshint插件的配置信息
        //“build”中描述了jshint要检查哪些js文档的语法
        //“options”中描述了要通过怎么的规则检查语法，
        //这些规则的描述文件就保存在网站根目录下的一个叫做“.jshintrc”的文件中。
        jshint: {
            //build:['Gruntfile.js','src/plugins/adTables/ad-code-config.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['src/data/*'],
                        flatten: true,
                        dest: 'build/data',
                        filter: 'isFile'
					},
                    {
                        expand: true,
                        cwd: 'src', //切换到 index 目录下
                        src: ['**/*', '!**/*.less'], //该目录下所有文件
                        dest: 'build/' //目标目录
                    }
            	]

            }
        },
        connect: {
            options: {
                port: 9556,
                hostname: "localhost", //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35731 //声明给 watch 监听的端口
            },
            //10.254.120.143
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: 'build/', //主目录
                    logger: 'dev',
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                                        // Include the proxy first
                                        proxy
                                    ].concat(defaultMiddleware);
                    }
                }
            },
            proxies: [{
                context: '/api',
                host: 'user.dxt.cn',
                port: 80,
                changeOrigin: false,
                xforward: false,
                https: false,
                rewrite: {
                    '^/api': '',
                },
                headers: {
                    host: 'user.dxt.cn'
                }
            }],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                        /* 加上下面这行 */
                        require('grunt-connect-proxy/lib/utils').proxyRequest
                    ];
                    }
                }
            }

        },
        watch: {
            build: {
                files: ['src/**/*'],
                tasks: ['clean', 'copy'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },

                files: [ //下面文件的改变就会实时刷新网页
                    'src/*.html',
                    'src/css/*.css',
					'src/lib/**/*.js',
					'src/lib/*.js',
					'src/module/**/*',
					'src/pages/**/*'
                ]
            }
        }
    });
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //告诉grunt当我们在终端中输入grunt的时候需要做些什么(注意先后顺序)
    grunt.registerTask('default', ['clean', 'copy', 'connect:server', 'configureProxies:server', 'watch']);
    //    grunt.registerTask('no-ug',['jshint','copy','connect:server','watch']);
    grunt.registerTask('ug', ['uglify']);
    grunt.registerTask('cp', ['copy']);
    grunt.registerTask('cl', ['clean']);
    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask('ct', ['concat']);
};
