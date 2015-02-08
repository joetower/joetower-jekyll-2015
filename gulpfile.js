var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp = require('child_process');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');

var paths = {
  imagesSrc: ['_img/**/*'],
  imagesDest: 'img',
  sass: '_scss/style.scss',
  sassFiles: '_scss/**/*.scss',
  css: '_site/css/',
  jekyll: ['**/*.html', '**/*.md', '!_site/**/*.html', '!node_modules/**/*'],
};

gulp.task('sass', function() {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src(paths.sass)
    .pipe(sass({
      bundleExec: true,
      compass: true,
      style: 'expanded',
      loadPath: [
        'bower_components/singularity/stylesheets',
        'bower_components/breakpoint-sass/stylesheets',
        'bower_components/compass-breakpoint/stylesheets',
        'bower_components/sass-toolkit/stylesheets',
        'bower_components/sass-css3-mixins/css3-mixins.scss',
      ]
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    // Only grab the images that have changed.
    .pipe(changed(paths.imagesDest))
    // Optimize all the images.
    .pipe(imagemin({optimizationLevel: 5}))
    // Put them in the images directory.
    .pipe(gulp.dest(paths.imagesDest));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sassFiles, ['sass']);
  gulp.watch(paths.imagesSrc, function() {
    runSequence(['images'], ['jekyll-rebuild']);
  });
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  browserSync.init([
    '_site/' + paths +  '/*.css',
    '_site/' + paths + '/*.js',
    '_site/**/*.html',
  ], {
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  });
});

// Our 'build' tasks for jekyll server.
gulp.task('jekyll-build', function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

// Our 'dev' tasks for jekyll server, note: it builds the files, but uses extra configuration.
gulp.task('jekyll-dev', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', function() {
  return runSequence(['jekyll-dev'], function () {
      browserSync.reload();
  });
});


gulp.task('server', function(cb) {
  return runSequence(['images', 'sass'],
    'jekyll-dev',
    ['browserSync', 'watch'],
    cb
  );
});

gulp.task('serve', ['server']);

gulp.task('build', function(cb) {
  return runSequence(['sass', 'images'],
    'jekyll-build',
    cb
  );
});
