var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    vinylPaths = require('vinyl-paths'),
    config = require('./app/config');

gulp.task('build:phototek', function() {
    gulp.src(['app/statics/**/*'])
        .pipe(gulp.dest('public'));

    gulp.src('app/client/phototek.app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : config.debugMode
        }))
        .pipe(gulpif(!config.debugMode,uglify()))
        .pipe(rename('phototek.build.js'))
        .pipe(gulp.dest('public/js/'));
});
gulp.task('build:resources', function() {
    //Vendors
    gulp.src(['node_modules/angular-material/*.css'])
        .pipe(gulpif('**/*.less', less()))
        .pipe(gulp.dest('public/resources/vendors/angular-material'));

    gulp.src(['node_modules/material-design-icons/iconfont/*.*'])
        .pipe(gulpif('**/*.less', less()))
        .pipe(gulp.dest('public/resources/vendors/material-design-icons/iconfont'));

   gulp.src(['node_modules/font-awesome/**/*'])
        .pipe(gulp.dest('public/resources/vendors/font-awesome'));

    // App
    gulp.src(['app/client/resources/**/*'])
        .pipe(gulpif('**/*.less', less()))
        .pipe(gulp.dest('public/resources'));

    gulp.src(['app/client/views/**/*'])
        .pipe(gulp.dest('public/views'));
});
gulp.task('clean', function () {
  return gulp.src(['public/*'])
    .pipe(vinylPaths(del));
});
gulp.task('build', ['build:phototek','build:resources']);
