var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return sass('scss/**/*.scss')
    .pipe(gulp.dest('style'))
    .pipe(reload({ stream:true }));
});

gulp.task('refresh', ['sass'], function() {
    reload();
})

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch(['*.html', 'scss/**/*.scss', 'js/**/*.js','gulpfile.js'], ['refresh']);
});
