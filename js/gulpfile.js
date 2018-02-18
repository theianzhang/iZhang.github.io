var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

gulp.task('miniImages', function(callback) {
	gulp.src('../img/hero/*.png')
	.pipe(imageResize({
		format: 'jpeg',
		noProfile: true,
		width: 5000,
		height: 5000
	}))
	.pipe(imagemin())
	.pipe(gulp.dest('../img/hero/'));
});
