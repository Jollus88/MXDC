# Installation
To install, make sure Gulp is first installed by typing `npm install gulp -g` via command line.

Then create a Gulp project under **_path/to/app_**, and run `npm init`.
Leave all values as default for now.

Then install Gulp to the project `npm install gulp@3.9.1 --save-dev`.

## Download dependencies

`npm install gulp-sass browser-sync gulp-if gulp-cache gulp-uglify gulp-sourcemap gulp-cssnano gulp-uncss gulp-imagemin gulp-cache del run-sequence gulp-autoprefixer --save-dev`

`npm install --save-dev gulp-babel babel-core babel-preset-env babel-polyfill`

To make edits and automatically compile SASS commands, use `gulp`.

To create a build, use `gulp build`. All files will be compiled and rendered to a /public folder within the workspace root.