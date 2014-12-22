/**
 * @fileoverview gulpfile example
 * @author javey
 * @date 14-12-22
 */

var gulp = require('gulp'),
    nocache = require('../src/index.js');

gulp.task('build_image', function() {
    // 返回stream保存任务完成再进行下一个任务
    return gulp.src('./web/edit.png')
        .pipe(nocache({
            type: 'media', // media/css/js/tpl
            dest: './build/[path][name].[hash:6].[ext]',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build_css', ['build_image'], function() {
    return gulp.src('./web/main.css')
        .pipe(nocache({
            type: 'css',
            dest: './build/[path][name].[hash:6].[ext]',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build_js', ['build_image'], function() {
    return gulp.src('./web/**/*.js')
        .pipe(nocache({
            type: 'js',
            dest: './build/[path][name].[hash:6].[ext]',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build_tpl', ['build_image', 'build_css', 'build_js'], function() {
    return gulp.src('./web/index.html')
        .pipe(nocache({
            type: 'tpl',
            dest: './build/[path][name].[ext]',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build_tpl']);