var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  gutil = require('gutil'),
  include = require('gulp-include');

var paths = {
  scripts: 'sources/*.coffee',
  sub_scripts: 'sources/*/*.coffee',
  styles: 'sources/*.less',
};

gulp.task('scripts', function(event) {
  var incl = include();
  incl.on('error', function(e) {
    gutil.log("Include: " + e.message);
  });

  var coffe_action = coffee({
    bare: true
  });
  coffe_action.on('error', function(e) {
    gutil.log("Coffee: " + e);
    coffe_action.end();
  });

  return gulp.src(paths.scripts)
    .pipe(incl)
    .pipe(coffe_action)
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function(event) {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sub_scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);