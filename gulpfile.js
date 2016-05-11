var gulp = require('gulp');
var connect = require('gulp-connect'); 
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('styles/*.scss', ['sass']);
});

gulp.task('default', ['webserver', 'sass', 'sass:watch']);

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});
