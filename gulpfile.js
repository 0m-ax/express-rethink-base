'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

//process sass
gulp.task('sass', function () {
  return gulp.src('./static-src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static-src/css/*.scss', ['sass']);
});
//process images
gulp.task('image', function () {
  return gulp.src('./static-src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/img'));
});

gulp.task('image:watch', function () {
  gulp.watch('./static-src/img/*', ['image']);
});
//process javascript
gulp.task('js', function () {
  return gulp.src('./static-src/js/*.js')
    .pipe(gulp.dest('./static/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./static-src/js/*.js', ['js']);
});


gulp.task('watch',['sass:watch','image:watch','js:watch'])
gulp.task('process',['sass','image','js'])
gulp.task('default',['process','watch'])
