const { dest, src, watch, series, parallel, task } = require('gulp'),
	sass = require('gulp-sass'),
	autoPrefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	shorthand = require('gulp-shorthand'),      // сокращение стилей
	stylelint = require('gulp-stylelint'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),      // уведомления об ошибках
	rename = require('gulp-rename');            

module.exports = task('styles', () => {
	return src('src/styles/*.scss')
		.pipe(plumber({
			errorHandler: function(err) {
			  notify.onError({
				title: "Ошибка в SCSS",
				message: "<%= error.message %>"
			  })(err);
			}
		  }))
		.pipe(sass())
		.on('error', notify.onError({
			title: 'SASS',
			message: '<%= error.message %>'         // вывод сообщения об ошибке
		}))
		.pipe(sourcemaps.init())
			.pipe(autoPrefixer(['last 15 versions', '> 1%'], {cascade: false}))    // настройка автоматической подстановки вендорных префиксов
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(sourcemaps.write())
		.pipe(dest('./build/css'));
});

// Таск для продакшена
module.exports = task('_styles', () => {
	return src('src/styles/*.scss')
		.pipe(sass())
		.pipe(autoPrefixer(['last 15 versions', '> 1%'], {cascade: false}))    // настройка автоматической подстановки вендорных префиксов
		.pipe(cleanCss())
		.pipe(shorthand())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss())
		.pipe(dest('./build/css'));
});
