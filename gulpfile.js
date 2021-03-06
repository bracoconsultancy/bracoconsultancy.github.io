const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass',() => {
return gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'));
});

gulp.task('default',() => {
    gulp.watch('src/scss/*.scss',gulp.series('sass'));
});
