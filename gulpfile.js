'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var rimraf = require('rimraf');

function buildJS() {
  return gulp.src('src/**/*.{js,jsx}')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015', 'react'],
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
}

function copyHtml() {
  gulp.src('src/renderer/index.html')
  .pipe(gulp.dest('dist/renderer'));
}

function cleanAllDirectory(cb) {
  rimraf('./dist', cb);
}

function buildAll() {
  buildJS();
  copyHtml();
}
gulp.task('build:js', buildJS );

gulp.task('watch', function(done) {
  return gulp.src('src/**/*.{js,jsx}')
  .pipe(plumber())
  .pipe(watch('src/**/*.{js,jsx}', { verbose:true }))
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015', 'react'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});

gulp.task('html',copyHtml);

gulp.task('clean', cleanAllDirectory);


gulp.task('default', ['clean'], buildAll);
