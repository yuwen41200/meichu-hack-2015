
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browsersSync = require('browser-sync');

gulp.task('default' , ['scss']);

gulp.task('scss' , function(){
	return gulp.src('meichu.scss')
		.pipe(sass())
		.on('error' , errorLog )
		.pipe(autoprefixer(['last 10 version']))
		.pipe(cssmin())
		.pipe(gulp.dest('./'));
});

gulp.task('debug' , ['scss'] , function(){
	var reload = browsersSync.reload;
	browsersSync({
		server: {
      	baseDir: './build/'
      }
	});

	gulp.watch( './meichu.scss' ,['scss',reload]);
	gulp.watch( './index.html' ,['default',reload] );
});


function errorLog(error){
	console.log(error.toString());
	console.error.bind(error);
	this.emit('end');
}