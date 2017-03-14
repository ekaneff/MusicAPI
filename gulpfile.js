var gulp = require('gulp');
var git = require('gulp-git');
var argv = require('yargs').argv;
var gitignore = require('gulp-gitignore');

gulp.task('add', function() {
	console.log('adding...')
	return gulp.src('.')
		.pipe(gitignore())
		.pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting...');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function(){
  console.log('pushing to origin ' + argv.b);
  git.push('origin', argv.b, function (err) {
    if (err) throw err;
  });
});

gulp.task('default', ['add', 'commit']);

gulp.task('send', ['add', 'commit', 'push']);