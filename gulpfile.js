const gulp = require('gulp');
const connect = require('electron-connect').server.create();
const packager = require('electron-packager');
const del = require('del');
const fs = require('fs');
const cp = require('gulp-copy');

const manifest = require('./package.json');

gulp.task('start', () => {
  connect.start();
  gulp.watch(['./src/scripts/*.js'], connect.restart);
  gulp.watch(['./src/styles/*.css'], connect.reload);
  gulp.watch(['./src/index.html'], connect.reload);
});

gulp.task('clean:tmp', cb => {
  return del(['.tmp'], cb);
});

gulp.task('install', ['clean:tmp'], () => {
  return gulp.src(['./src/**/*', 'package.json'])
    .pipe(cp('./.tmp'));
});

gulp.task('build', ['install'], cb => {
  packager({
    dir: './.tmp',
    packageJson: manifest,
    name: manifest.productName,
    platform: 'darwin',
    arch: 'x64',
    appBundleId: manifest.bundle,
    electronVersion: '1.6.8',
    icon: './src/assets/icon.icns',
    out: './dist/darwin64',
    cache: '.cache'
  }, cb);
});

gulp.task('clean:build:darwin64', cb => {
  return del(['./dist/darwin64/*'], cb);
});

gulp.task('clean', ['clean:build:darwin64']);
