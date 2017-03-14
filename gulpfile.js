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

gulp.task('add',['gitAdd'],function() {
  console.log('commiting...');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('gitPush',function(){
  console.log('pushing to origin dev');
  git.push('origin', 'dev', function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutReleaseCreate', function(){
  git.checkout('release', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutDevelopCreate', function(){
	console.log('Checkout to new dev branch');
  git.checkout('dev', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('checkoutDevelop', function(){
	console.log('Checkout to dev branch');
  git.checkout('dev', function (err) {
    if (err) throw err;
  });
});

gulp.task('default', ['checkoutReleaseCreate', 'checkoutDevelopCreate']);

gulp.task('send', ['gitAdd','gitCommit', 'checkoutDevelop', 'gitPush']);





