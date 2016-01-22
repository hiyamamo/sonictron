'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rimraf = require('rimraf');

function compileJS() {
  return gulp.src('src/**/*.{js,jsx}')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015', 'react'],
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
}

function compileStyles() {
  gulp.src('src/**/main.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
}

function copyHtml() {
  gulp.src('src/renderer/index.html')
  .pipe(gulp.dest('dist/renderer'));
}

function cleanAllDirectory(cb) {
  rimraf('./dist', cb);
}

function compileAll() {
  compileJS();
  copyHtml();
  compileStyles();
}

gulp.task('compile:js', compileJS);

gulp.task('compile:styles', compileStyles);

gulp.task('watch', function(done) {
  gulp.watch('src/**/*.js', ['compile:js']);
  gulp.watch('src/**/*.scss', ['compile:styles']);
});

gulp.task('html',copyHtml);

gulp.task('clean', cleanAllDirectory);


gulp.task('default', ['clean'], compileAll);
