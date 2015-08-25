'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));

server.get('/data', function(req, res) {
  var i = 1, len = 20, four = 4, tempData = [];
  var _size = [
    {w: '633', h: '633'},
    {w: '949', h: '633'},
    {w: '919', h: '613'},
    {w: '919', h: '613'}
  ];

  for( ;len > i; i++ ){
    var m = i % four,
        s = _size[ m ];

    tempData.push({
      src: '/temp/temp'+ m +'.jpg',
      w: s.w,
      h: s.h
    })
  };

  res.json( tempData );
});

// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.get('/', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('live', ['views', 'lint', 'browserify'], function() {});
gulp.task('dev', ['views', 'temp','lint', 'browserify'], function() {});
// Clean task
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

// Styles task
// gulp.task('styles', function() {
//   gulp.src('app/styles/*.scss')
//   // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
//   .pipe(sass({onError: function(e) { console.log(e); } }))
//   // Optionally add autoprefixer
//   .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
//   // These last two should look familiar now :)
//   .pipe(gulp.dest('dist/css/'));
// });

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('bundle.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('dist/'));

  gulp.src('app/views/**/*')
  .pipe(gulp.dest('dist/views/'));

  gulp.src('app/images/**/*')
  .pipe(gulp.dest('dist/images/'));

  gulp.src('app/styles/**/*')
  .pipe(gulp.dest('dist/styles/'));

  gulp.src('app/libs/**/*')
  .pipe(gulp.dest('dist/libs/'));
});

gulp.task('temp', function() {
  gulp.src('app/temp/**/*')
  .pipe(gulp.dest('dist/temp/'));
});


gulp.task('watch', ['lint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch our sass files
  // gulp.watch(['app/styles/**/*.scss'], [
  //   'styles'
  // ]);

  gulp.watch(['app/**/*.html', 'app/libs/**/*' ], [
    'views'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);

});

gulp.task('default', ['live', 'watch']);
