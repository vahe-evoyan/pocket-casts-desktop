'use strict';

const gulp = require('gulp');
const electron = require('electron-connect').server.create();

gulp.task('start', () => {
  electron.start();
  gulp.watch(['./src/scripts/*.js'], electron.restart);
  gulp.watch(['./src/styles/*.css'], electron.reload);
  gulp.watch(['./src/index.html'], electron.reload);
});
