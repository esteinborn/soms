module.exports = function(grunt) {

require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    foundation: {
      js: ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
      scss: ['scss/foundation.scss']
    },

    sass: {
      dist: {
        options: {
          includePaths: ['scss'],
          sourceComments: 'normal'
        },
        files: {
          'dist/assets/css/foundation.css': '<%= foundation.scss %>',
          'dist/assets/css/normalize.css': 'scss/normalize.scss',
          'dist/assets/css/app.css': 'scss/app.scss'
        }
      },
      dist_compressed: {
        options: {
          outputStyle:'compressed',
          includePaths: ['scss']
        },
        files: {
          'dist/assets/css/foundation.min.css': '<%= foundation.scss %>'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'dist/assets/js/foundation.js': '<%= foundation.js %>'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        //'-W083': false, // this stops the Function Within a loop error from the UnoSlider plugin
        globals: {
          jQuery: true
        }
      },
      files: [
        'js/app/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'dist/assets/js/foundation.min.js': ['<%= foundation.js %>'],
          'dist/assets/js/app/app.js': 'js/app/app.js'
        }
      }
    },

    copy: {
      dist: {
        files: [
          {cwd: 'js/', expand:true, filter: 'isFile', src: ['{foundation,vendor,app}/**/*.js'], dest: 'dist/assets/js'},
          {cwd: 'scss/', expand:true, filter: 'isFile', src: '**/*.scss', dest: 'dist/assets/scss/'},
          {cwd: 'img/', expand:true, filter: 'isFile', src: '**/*', dest: 'dist/assets/img/'},
          {cwd: 'scss/foundation/components/fonts', expand:true, filter: 'isFile', src: '**/*', dest: 'dist/assets/css/fonts'}
        ]
      }
    },

    clean: ['dist/assets'],


    watch_start: {

      styles: {
        files: ['scss/**/*.scss', 'doc/assets/**/*.scss'],
        tasks: ['sass'],
        options: {livereload:true}
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'copy', 'concat', 'uglify'],
        options: {livereload:true}
      }
    },


  });

  grunt.task.renameTask('watch', 'watch_start');
  grunt.task.registerTask('watch', ['watch_start']);

  grunt.registerTask('compile', ['clean', 'sass', 'concat', 'jshint', 'uglify', 'copy']);
  grunt.registerTask('build', ['compile', 'compress']);
  grunt.registerTask('default', ['compile', 'watch']);
};
