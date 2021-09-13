const { dest, src, watch, series, parallel, task } = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat');
	importFile = require('gulp-file-include');

module.exports = task('scripts', () => {
	return src('src/js/main.js')
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Ошибка в JavaScript",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(importFile({                          //
			prefix: '@@',                             // импортим все файлы, описанные в результирующем js
			basepath: '@file'                         //
		}))
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(dest('./build/js'))
});

module.exports = task('_scripts', () => {
	return src('src/js/main.js')
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Ошибка в JavaScript",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(importFile({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(dest('./build/js'))
});

module.exports = task('libs', () => {
	return src('src/js/vendor/libs.js')
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Ошибка в JavaScript",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(importFile({                          //
			prefix: '@@',                             // импортим все файлы, описанные в результирующем js
			basepath: '@file'                         //
		}))                            // минификация JS
		.pipe(rename({
			suffix: '.min'                            // переименовываем сжатый файл
		}))
		.pipe(dest(`./build/js/vendor`))             // путь вывода файлов
	});
