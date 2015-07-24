var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var livereload = require('gulp-livereload');  
var csslint = require('gulp-csslint'); 
var html5Lint = require('gulp-html5-lint');
var htmllint = require('gulp-htmllint');
var watch = require('gulp-watch');
var jslint = require('gulp-jslint');

//lint js
gulp.task('js', function () {
    return gulp.src(['./project/js/**/**/**/**/*.js'])
            .pipe(jslint({
                reporter: function (evt) {
                    var msg = ' ' + evt.file;
                    
                    if (evt.pass) {
                        msg = '[PASS]' + msg;
                    } else {
                        msg = '[FAIL]' + msg;
                    }
                    
                    console.log(msg);
                }
            }))  
            .pipe(livereload());
});
//lint all css
gulp.task('css', function() {
  gulp.src('./project/css/**/**/**/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(livereload()); 
});

//lint all js 
gulp.task('html5-lint', function() {
    return gulp.src('./project/**/**/**/**/**/*.html')
        .pipe(htmllint()) 
        .pipe(livereload());
});

/** Watch **/
gulp.task('watch',['watch:css',
                   'watch:html',
                   'watch:js']
);

gulp.task('watch:html', function() {
  livereload.listen();
  gulp.watch('./project/**/**/**/**/**/*.html', ['html5-lint']);
});

gulp.task('watch:css', function() {
  livereload.listen();
  gulp.watch('./project/css/**/**/**/**/*.css', ['css']);
});

gulp.task('watch:js', function() {
  livereload.listen();
  gulp.watch('./project/js/**/**/**/**/*.js', ['js']);
});    

/** End watch **/ 
gulp.task('default', ['watch']);
