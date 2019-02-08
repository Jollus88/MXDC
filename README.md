# Installation
To install, make sure Gulp is first installed `npm install gulp -g`

Then create a Gulp project under **_path/to/app_** 'npm init'
Leave all values as default for now.

Then install Gulp to the project `npm install gulp@3.9.1 --save-dev`

## Download dependencies

`npm install gulp-sass browser-sync gulp-useref gulp-if gulp-cache gulp-uglify gulp-sourcemap gulp-cssnano gulp-uncss gulp-imagemin gulp-cache del run-sequence gulp-jsonminify gulp-autoprefixer --save-dev`

To make edits and automatically compile SASS commands, use `gulp`

To create a build, use `gulp build`

## Current issues

JS and CSS files not transferring over after Gulp build