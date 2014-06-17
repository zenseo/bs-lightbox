var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  gutil = require('gutil'),
  path = require('path'),
  minifyCSS = require('gulp-minify-css');

var paths = {
  scripts: 'source/*.coffee',
  styles: 'source/*.less',
};

gulp.task('scripts', function(event) {
  var coffe_action = coffee({
    bare: true
  });
  coffe_action.on('error', function(e) {
    gutil.log("Coffee: " + e);
    coffe_action.end();
  });

  return gulp.src(paths.scripts)
    .pipe(coffe_action)
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('bs-lightbox.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function(event) {
  return gulp.src(paths.styles)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(rename('bs-lightbox.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(event) {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);