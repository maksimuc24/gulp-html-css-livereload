var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var livereload = require('gulp-livereload');  
var csslint = require('gulp-csslint'); 
var html5Lint = require('gulp-html5-lint');
var watch = require('gulp-watch');

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
        .pipe(html5Lint())
        .pipe(livereload());
});

/** Watch **/
gulp.task('watch',['watch:css',
                   'watch:html']
);

gulp.task('watch:html', function() {
  livereload.listen();
  gulp.watch('./project/**/**/**/**/**/*.html', ['html5-lint']);
});

gulp.task('watch:css', function() {
  livereload.listen();
  gulp.watch('./project/css/**/**/**/**/*.css', ['css']);
});   

/** End watch **/ 
gulp.task('default', ['watch']);
