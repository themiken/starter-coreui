
'use strict';

// Folder variables
var srcSite = 'src/main/resources';
var buildSite = 'build/resources/main';
var srcAssetsApp = srcSite + '/assets/**/*';
var srcES6 = srcSite + '/**/*.es6';
var buildAssets = buildSite + '/assets/dist';

var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpWebpack = require('webpack-stream');
var prettyError = require('gulp-prettyerror');


gulp.task('default',['babel', 'webpack']);

gulp.task('webpack', function() {
    return gulp
        .src( srcAssetsApp )
        .pipe(prettyError())
        .pipe(gulpWebpack(require('./webpack.config.js')))
        .pipe(gulp.dest(buildAssets));
});


gulp.task('webpack-dev', function() {
    return gulp
        .src( srcAssetsApp )
        .pipe(prettyError())
        .pipe(gulpWebpack(require('./webpack-dev.config.js')))
        .pipe(gulp.dest(buildAssets));
});


gulp.task('babel', () => {
    return gulp.src( srcES6 )
        .pipe(prettyError())
        .pipe(babel({
            presets: [
                ['es2015', {'modules': false}]
            ]
        }))
        .pipe(gulp.dest( buildSite ));
});


gulp.task('watch', function() {
    gulp.watch( srcES6 , ['babel']);
    gulp.watch( srcAssetsApp , ['webpack-dev']);
});


