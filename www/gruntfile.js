module.exports = function (grunt) {
    var autoprefixer = require('autoprefixer-core');
    grunt.initConfig({
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass','cssmin']
            }
        },
        sass: {
            dist: {
                files: {
                    'sass/global.css' : 'sass/**/*.scss',
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.css', '!*.min.css'],
                    dest: 'sass/min',
                    ext: '.min.css'
                }]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};

