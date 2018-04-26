var gulp = require('gulp'),
sass = require('gulp-sass'),
cssMinify = require('gulp-clean-css');

var gulp_DIR = 'gulp/';
var assets_DIR = 'assets/';

gulp.task('css', function(){
    gulp.src([
        gulp_DIR + 'style.scss',
    ])
    .pipe(sass())
    .pipe(cssMinify())
    .pipe(gulp.dest(assets_DIR + 'css/'))
});

gulp.task('build', ['css']);

gulp.task('watching', function(){
    gulp.watch([gulp_DIR + 'style.scss'], ['css']);
});
