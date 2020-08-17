var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
 
gulp.task('resize', function(done) {
  gulp.src('../img/home/*.{jpg,png,jpeg}')
    .pipe(imageResize({
      percentage: 25, 
      upscale : false
    }))
    .pipe(gulp.dest('../img/home'));
    done();
});
