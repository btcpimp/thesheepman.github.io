'use strict';

// https://habrahabr.ru/post/250569/

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    // rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin');
// var path = {
//     build: { 
//         html: 'build/',
//         js: 'build/js/',
//         css: 'build/css/',
//         img: 'build/img/',
//         fonts: 'build/fonts/'
//     },
//     src: { 
//         html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
//         js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
//         style: 'src/style/main.scss',
//         img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
//         fonts: 'src/fonts/**/*.*'
//     },
//     watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
//         html: 'src/**/*.html',
//         js: 'src/js/**/*.js',
//         style: 'src/style/**/*.scss',
//         img: 'src/img/**/*.*',
//         fonts: 'src/fonts/**/*.*'
//     },
//     clean: './build'
// };

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



gulp.task('css:build', function () {
    gulp.src(path.src.сss)
      .pipe(prefixer())
      .pipe(cssmin())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(path.build.css)) 
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
      .pipe(jsmin())
      .pipe(concat('script.min.js'))
      .pipe(gulp.dest(path.build.js)) 
});