var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

gulp.task('miniImages', function(callback) {
	gulp.src('../img/*.png')
	.pipe(imageResize({
		format: 'jpeg',
		noProfile: true,
		width: 500,
		height: 500
	}))
	.pipe(imagemin())
	.pipe(gulp.dest('../img/'));
});
