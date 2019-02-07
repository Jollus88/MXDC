TODO: 
	- Set up Gulp compiler to compile SASS files into CSS
	- Configure compiler to compress images and output everything to /public folder

------------------------------------------------------------------------------

# Installation
To install, make sure Gulp is first installed `npm install gulp -g`

Then create a Gulp project under **_path/to/site_** 'npm init'
Leave all values as default for now.

Then install Gulp to the project `npm install gulp --save-dev`

## Download dependencies

`npm install gulp-sass browser-sync gulp-useref gulp-if gulp-cache gulp-uglify gulp-sourcemaps gulp-cssnano gulp-uncss gulp-imagemin gulp-cache del run-sequence gulp-autoprefixer --save-dev`

To make edits and automatically compile SASS commands, use `gulp`

To create a build, use `gulp build`