// TODO: This script breaks in Gulp v4.0.0. Unsure of exact reason, but has something to do with the watch task.
// JS and CSS files do not transfer over after build

var gulp = require('gulp');

var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var del = require('del');
var babel = require('gulp-babel');

sass.compiler = require('node-sass');


// Development Tasks
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	// Reloads the browser whenever HTML or JS files change
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

// Stylesheet compiling
gulp.task('sass', function(){
	return gulp.src('dev/scss/_all.scss')
		.pipe(concat('template.min.css'))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dev/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Minify css
gulp.task('minifycss', function(){
	return gulp.src('dev/css/**/*.css')
		.pipe(cssnano())
})

// DEFAULT TASK
gulp.task('default', function(){
	runSequence(['sass','browserSync','watch'])
});
// /////

// BUILD TASKS
// Running scripts through babel
gulp.task('scripts', function(){
	return gulp.src('dev/js/**/*.js')
		.pipe(babel({
			// THIS DOES NOT WORK
			// presets: ['es2015']
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('public/js'))
	});
	
// Compressing images
gulp.task('images', function(){
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
		// Caching images that have run through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('public/images'))
});

// Move just the CSS + map to the build folder
gulp.task('movecss', function(){
	return gulp.src('dev/css/**/*.css*')
	.pipe(gulp.dest('public/css'))
})

// Move HTML files
gulp.task('movehtml', function(){
	return gulp.src('dev/**.html')
	.pipe(gulp.dest('public'))
})

// Clean the public folder
gulp.task('clean:public', function(){
	return del.sync('public');
});

// Tie everything together into one glorious whole
gulp.task('build', function(){
	runSequence(
		'clean:public',
		['sass','scripts','images','minifycss','movecss','movehtml'])
});
// ////////