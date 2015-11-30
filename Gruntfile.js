module.exports = function(grunt) {

  var paths = {
    base: 'public',
    img: 'public/images',
    css: 'public/css',
    scss: 'public/scss',
    js: 'public/css'
  };

  // Project configuration.

  // Sprite
  grunt.initConfig({
    sprite:{
      all: {
        src: paths.img + '/icons/*.png',
        dest: paths.img + '/spritesheet.png',
        destCss: paths.css + '/spritesheet.css'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: paths.scss,
          src: ['*.scss'],
          dest: paths.css,
          ext: '.css'
        }]
      }
    },

    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['public/scss/*.scss'],
        tasks: ['sass'],
      },
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sprite','sass']);

};
