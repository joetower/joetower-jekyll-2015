module.exports = function(grunt) {

// Project configuration.
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
    // CONFIG ===================================/
     watch: {
          compass: {
           files: ['**/*.{scss,sass}'],
           tasks: ['compass:dev']
          },
          js: {
           files: ['js/**/*.js'],
           tasks: ['uglify']
          },
          autoprefixer: {
            files: ['_site/css/style.css'],
            tasks: ['autoprefixer']
        }
     },
     compass: {
       dev: {
           options: {
               sassDir: ['_scss'],
               cssDir: ['css'],
               environment: 'development'
           }
       },
       prod: {
           options: {
               sassDir: ['_scss'],
               cssDir: ['css'],
               environment: 'production'
            }
       }
     },
        uglify: {
           all: {
             files: {
                 'js/min/main.min.js': [
                 'js/jquery-1.11.1.js',
                 'js/main.js'
                ]
             }
           },
         },
        autoprefixer: {
            all: {
                files: {
                    '_site/css/style.css': '_site/css/style.css'
                }
            }
        },
   });
 
   // DEPENDENT PLUGINS =========================/
 
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-compass');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-autoprefixer');
 
   // TASKS =====================================/
   grunt.registerTask('prod', ['compass:dev']);
   grunt.registerTask('default', ['compass:dev' , 'autoprefixer', 'uglify' , 'watch']);
 
 };