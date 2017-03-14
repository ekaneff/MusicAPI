var gulp = require('gulp');
var git = require('gulp-git');
var argv = require('yargs').argv;
var gitignore = require('gulp-gitignore');

gulp.task('gitAdd', function() {
	console.log('adding...')
	return gulp.src('.')
		.pipe(gitignore())
		.pipe(git.add());
});

gulp.task('gitCommit', function() {
  console.log('commiting...');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('gitPush', function(){
  console.log('pushing to origin ' + 'dev');
  git.push('origin', 'dev', function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutRelease', function(){
  git.checkout('release', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutDevelop', function(){
  git.checkout('dev', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('default', ['checkoutRelease', 'checkoutDevelop']);

gulp.task('add', ['gitAdd', 'gitCommit']);

gulp.task('send', ['gitAdd', 'gitCommit', 'gitPush']);





