
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browsersSync = require('browser-sync');

gulp.task('default' , function(){
	var reload = browsersSync.reload;
	browsersSync({
		server: {
      	baseDir: './'
      }
	});

	gulp.watch( './main.js' ,['nothing',reload] );
	gulp.watch( './index.html' ,['nothing',reload] );
});

gulp.task('nothing',function(){
	console.log('reload');
});


function errorLog(error){
	console.log(error.toString());
	console.error.bind(error);
	this.emit('end');
}