'use strict';

var fs = require('fs'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer');

var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

gulp.task('live', ['views', 'temp', 'lint', 'browserify', 'browserify-mobile'], function() {});
gulp.task('clean', function() {
	gulp.src('./dist/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('compass', function() {
  gulp.src('app/styles/sass/*.scss')
    .pipe(compass({
      config_file: 'app/styles/config.rb',
      css: 'app/styles',
      sass: 'app/styles/sass'
    }))
    .pipe(gulp.dest('app/styles/'));
});

// Browserify task
gulp.task('browserify', function() {
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('bundle.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Browserify task
gulp.task('browserify-mobile', function() {
  gulp.src(['app/scripts/mobile.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('bundle-mobile.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('dist/'));

  gulp.src('app/mobile.html')
  .pipe(gulp.dest('dist/'));

  gulp.src('app/mobile_view.html')
  .pipe(gulp.dest('dist/'));

  gulp.src('app/views/**/*')
  .pipe(gulp.dest('dist/views/'));

  gulp.src('app/images/**/*')
  .pipe(gulp.dest('dist/images/'));

  gulp.src('app/styles/pc.css' )
  .pipe(gulp.dest('dist/styles/'));

  gulp.src('app/styles/m.css' )
  .pipe(gulp.dest('dist/styles/'));

  gulp.src('app/libs/**/*')
  .pipe(gulp.dest('dist/libs/'));
});

gulp.task('temp', function() {
  gulp.src('app/temp/**/*')
  .pipe(gulp.dest('dist/temp/'));
});

gulp.task('watch', ['lint'], function() {
  server.listen(serverport);
  refresh.listen(livereloadport);

  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js', 'app/libs/**/*'],[
    'lint',
    'browserify',
    'browserify-mobile'
  ]);

  gulp.watch(['app/styles/**/*.scss'], [
    'compass'
  ]);

  gulp.watch(['app/**/*.html', 'app/styles/**/*','app/libs/**/*.js' ], [
    'views'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);
});

gulp.task('default', ['live', 'watch']);

var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));

server.get('/mlist', function(req, res){
  var tempData = JSON.parse( fs.readFileSync('./testData/_tmp_mobile_list.json', 'utf8') );
  res.json( tempData );
});

server.get('/mdetail', function(req, res) {
  var tempData = JSON.parse( fs.readFileSync('./testData/_tmp_mobile_detail.json', 'utf8') );
  res.json( tempData );
});

server.get('/data', function(req, res) {
  var tempData = JSON.parse( fs.readFileSync('./testData/_tmp_pc_list.json', 'utf8') );
  res.json( tempData );
});

server.get('/', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

server.get('/mobile', function(req, res) {
  res.sendfile('mobile.html', { root: 'dist' });
});

server.get('/mobile_view', function(req, res) {
  res.sendfile('mobile_view.html', { root: 'dist' });
});
