/*
* Dependencias
*/
var gulp  = require('gulp');
var shell = require('gulp-shell');


gulp.task('deploy', function () {
  return gulp.src('').pipe(shell(["./scripts/losh deploy-gitbook"]));
});


//generar pdf
gulp.task('pdf',shell.task("gitbook pdf ./txt",{ verbose: true }));



gulp.task('build', function() {
  return gulp.src('').pipe(shell(['./scripts/losh generate-gitbook']));
});
});
