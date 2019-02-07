// TODO: This script breaks in Gulp v4.0.0. Unsure of exact reason, but has something to do with the watch task.

const gulp = require('gulp');

const sass = require('gulp-sass');
const uncss = require('gulp-uncss');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

// Other requires...
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const runSequence = require('run-sequence');
const del = require('del');

// Development Tasks
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	// Reloads the browser whenever HTML of JS files change
	gulp.watch('dev/*.html', browserSync.reload);
	gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'dev'
		}
	})
});

gulp.task('sass', function(){
	//return gulp.src('dev/scss/style.scss')
	return gulp.src('dev/scss/_main.scss')
		.pipe(concat('template.min.css'))
		// Minifies only if it's a CSS file
		// .pipe(gulpIf('*.css', cssnano()))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dev/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//

// Optimisation Tasks
gulp.task('images', function(){
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
		// Caching images that have run through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('public/images'))
});

gulp.task('useref', function(){
	return gulp.src('dev/*.html')
		.pipe(useref())
		// Minifies only if it's a JS file
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('public'))
		// Remove unused CSS
		/*.pipe(uncss({
			html: ['index.html']
		}))*/
		// Minifies only if it's a CSS file
		// .pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('public'))
});
gulp.task('clean:public', function(){
	return del.sync('public');
});
//

// Tie everything together into one glorious whole
/*gulp.task('task-name', function(callback) {
  runSequence('task-one', 'task-two', 'task-three', callback);
});*/
gulp.task('build', function(){
	runSequence(
		'clean:public',
		['sass','images','useref'])
});

gulp.task('default', function(){
	runSequence(['sass','browserSync','watch'])
});