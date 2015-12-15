var gulp = require('gulp');


var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    gzip = require('gulp-gzip'),
    bs = require('browser-sync'),
    reload = bs.reload,
    spawn = require('child_process').spawn,
    scsslint = require('gulp-scss-lint'),
    sequence = require('run-sequence'),
    deploy = require('gulp-gh-pages'),
    gutil = require('gulp-util'),
    c = gutil.colors,
    htmlmin = require('gulp-htmlmin');

var paths = {
  site: './_site/',
  imagesSrc: ['_img/**/*'],
  imagesDest: 'img',
  scripts: ['js/*.js', '!js/jquery-1.11.1.js'],
  sass: '_scss/style.scss',
  sassFiles: '_scss/**/*.scss',
  css: '_site/css/',
  jekyll: ['**/*.html', '**/*.md', '!_site/**/*.html', '!./bower_components', '!node_modules/**/*'],
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
// Compile Our Sass
//////////////////////////////
gulp.task('sass', function() {
  bs.notify('<span style="color: grey">Running:</span> Sass task');
  return gulp.src(paths.sass)
    .pipe(sass({
        outputStyle: 'nested',
      })
      .on('error', function(err, res) {
        gutil.log(c.red('sass'), 'failed to compile');
        gutil.log(c.red('> ') + err.message);
        bs.notify('<span style="color: red">Sass failed to compile</span>');
      })
    )
    .pipe(prefix('last 2 versions', '> 1%'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest(paths.css))
    .pipe(reload({stream:true}));
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
    .pipe(gulp.dest(paths.imagesDest))
    .pipe(gulp.dest(paths.site + paths.imagesDest))
    .pipe(reload({stream:true}));
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
// Our 'build' tasks for jekyll server.
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


//////////////////////////////
// Watch for changes during development
//////////////////////////////
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'jekyll-dev']);
  gulp.watch(paths.sassFiles, ['sass']);
  gulp.watch(paths.jekyll, ['jekyll-dev']);
  gulp.watch(paths.imagesSrc, ['images']);
});

//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browser-sync', function () {
  bs({
    server: './_site/'
  });
});

//////////////////////////////
// Build Jekyll
//////////////////////////////
gulp.task('build', function(cb) {
  return sequence(['lint', 'sass', 'images'],
    'jekyll-build',
    // 'minify-html',
    cb
  );
});

//////////////////////////////
// Development server
//////////////////////////////
gulp.task('bs', ['lint', 'images', 'sass', 'jekyll-dev', 'browser-sync', 'watch']);

// legacy command for BS
gulp.task('server', ['bs']);

//////////////////////////////
// Default: build site
//////////////////////////////
gulp.task('default', ['build']);
