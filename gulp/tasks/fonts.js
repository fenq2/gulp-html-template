const { dest, src, watch, series, parallel, task } = require('gulp'),
	debug = require('gulp-debug');

task("fonts", () => {
	return src('./src/fonts/**/*.*')
		.pipe(dest('./build/fonts'))
		.pipe(debug({
			"title": "fonts"
		}));
});