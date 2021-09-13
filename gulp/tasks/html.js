const { dest, src, watch, series, parallel, task } = require('gulp'),
	htmlValidator = require('gulp-w3c-html-validator'),
	bemValidator = require('gulp-html-bem-validator'),
	plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
	notify = require('gulp-notify'),
	critical = require('critical').stream;

module.exports = task('html', () => {
	return src('src/pages/*.html')
		.pipe(plumber({
			errorHandler: function(err) {
			notify.onError({
				title: "Ошибка в html",
				message: "<%= error.message %>"
			})(err);
			}
		}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
		.pipe(bemValidator())
		.pipe(dest('./build/'))
});

module.exports = task('_html', () => {
	return src('src/pages/*.html')
		.pipe(plumber({
			errorHandler: function(err) {
			notify.onError({
				title: "Ошибка",
				message: "<%= error.message %>"
			})(err);
			}
		}))
		.pipe(critical({                            // генерируем критический CSS для быстрой загрузки страниц
			base: `./build/`,                      // из всех наших файлов
			minify: true,                           // с минификацией
			inline: true,
			width: 1920,
			height: 1280,
			css: [`./build/css/styles.min.css`]     // путь к вашему основному файлу стилей, или несколько файлов через звпятую
		}))
		.pipe(bemValidator())
		.pipe(htmlValidator())
		.pipe(dest('./build/'))
});