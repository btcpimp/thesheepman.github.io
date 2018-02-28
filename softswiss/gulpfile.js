'use strict';
var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin');
var path = {
    src: {
        // CSS в порядке подключения
        сss: [
            './css/reset.css',
            './css/main.css',
            './css/adaptive.css'
        ],
        js: [
            './libs/angular.min.js',
            './libs/jquery-3.2.1.min.js',
            './js/app.js',
            './js/common.js'
        ]
    },
    build: {
        css: './compressed/css',
        js: './compressed/js'
    },
}



gulp.task('css:build', function() {
    gulp.src(path.src.сss)
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(jsmin())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(path.build.js))
});
