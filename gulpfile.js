var jshint = require('gulp-jshint'),
    gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifyCss = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bs = require('browser-sync'),
    reload = bs.reload,
    spawn = require('child_process').spawn,
    sequence = require('run-sequence'),
    changed = require('gulp-changed'),
    scsslint = require('gulp-scss-lint'),
    htmlmin = require('gulp-htmlmin');

var paths = {
  site: './_site/',
  imagesSrc: ['_img/**/*'],
  imagesDest: 'img',
  scripts: ['js/*.js', '!_src/js/vendor**/*.js'],
  sass: '_scss/style.scss',
  sassFiles: '_scss/**/*.scss',
  css: '_site/css/',
  jekyll: ['**/*.html', '**/*.md', '!_site/**/*.html', '!node_modules/**/*'],
};

//////////////////////////////
// Minify HTML
//////////////////////////////
gulp.task('minify-html', function() {
  return gulp.src(paths.site + '**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.site));
});

//////////////////////////////
// Compile Sass
//////////////////////////////
gulp.task('sass', function() {
  bs.notify('<span style="color: grey">Running:</span> Sass compiling');
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
      ]
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest(paths.css))
    .pipe(bs.reload({stream:true}));
});

//////////////////////////////
// SCSS Lint
//////////////////////////////
gulp.task('scss-lint', function() {
  gulp.src(paths.sassFiles)
  .pipe(scsslint());
});

//////////////////////////////
// Minify CSS
//////////////////////////////
gulp.task('minify-css', function() {
  return gulp.src('css/style.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

//////////////////////////////
// Minify JS
//////////////////////////////
gulp.task('minify-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site/js'));
});

//////////////////////////////
// Copy all static images
//////////////////////////////

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    // Only grab the images that have changed.
    .pipe(changed(paths.imagesDest))
    // Optimize all the images.
    .pipe(imagemin({optimizationLevel: 5}))
    // Put them in the images directory.
    .pipe(gulp.dest(paths.imagesDest));
});

//////////////////////////////
// Lint Task
//////////////////////////////
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//////////////////////////////
// Watch Files
//////////////////////////////
gulp.task('watch', function() {
  gulp.watch(paths.sassFiles, ['sass']);
  gulp.watch(paths.imagesSrc, function() {
    sequence(['images'], ['jekyll-rebuild']);
  });
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  bs.init([
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

//////////////////////////////
// 'build' tasks for jekyll server.
//////////////////////////////
gulp.task('jekyll-build', function (done) {
  return spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', function() {
      done();
      reload();
    });
});


//////////////////////////////
// Our 'dev' tasks for jekyll server, note: it builds the files, but uses extra configuration.
//////////////////////////////
gulp.task('jekyll-dev', function () {
  bs.notify('<span style="color: grey">Running:</span> jekyll-dev');

  return spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
    .on('close', reload);
});


gulp.task('server', function(cb) {
  return sequence(['sass', 'minify-css', 'minify-js', 'images'],
    'jekyll-dev',
    ['browserSync', 'watch'],
    cb
  );
});

gulp.task('serve', ['server']);


//////////////////////////////
// Build Jekyll
//////////////////////////////
gulp.task('build', function(cb) {
  return sequence(['lint', 'sass', 'minify-css', 'minify-js', 'images'],
    'jekyll-build',
    // 'minify-html',
    cb
  );
});
