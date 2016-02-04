'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rimraf = require('rimraf');
var _ = require('lodash');
var packager = require('electron-packager');
var install = require('gulp-install');

var fs = require('fs');
var packageJson = require('./package.json');
var mkdirp = require('mkdirp');
var path = require('path');

var distDir = 'dist';

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

gulp.task('misc', function() {
  gulp.src('images/**/*')
  .pipe(gulp.dest(distDir + '/images'));
});

gulp.task('html',copyHtml);

gulp.task('clean', cleanAllDirectory);

gulp.task('install:dependencies', ['packageJson'], function () {
  gulp.src('dist/package.json')
  .pipe(install({production: true}));
});

gulp.task('packageJson', function(done) {
  var json = _.cloneDeep(packageJson);
  json.main = 'main/main.js';
  mkdirp(path.dirname('dist/package.json') , function(err) {
    fs.writeFile('dist/package.json', JSON.stringify(json), function(err) {
      done();
    });
  });
});

gulp.task('package', [ 'win32', 'darwin', 'linux' ].map(function(platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, ['build'], function(done) {
    packager({
      dir: 'dist',
      name: 'Sonictron',
      arch: 'all',
      platform: platform,
      out: 'release',
      overwrite: true,
      version: '0.36.7',
      asar: true,
    }, function(err) { done(); });
  });
  return taskName;
}));

gulp.task('build', ['misc', 'install:dependencies', 'html', 'compile:styles', 'compile:js']);

gulp.task('default', ['build']);

