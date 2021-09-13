const { dest, src, watch, series, parallel, task } = require('gulp');

module.exports = task('watch', () => {
	watch('./src/pages/**/*.html', series('html'));
	watch('./src/styles/**/*.scss', series('styles:dev'));
	watch(['./src/images/general/**/*.{png,jpg,gif,svg}',
		'./src/images/content/**/*.{png,jpg,gif,svg}'], series('images'));
	watch('./src/images/svg/*.svg', series('svg'));
	watch('./src/js/**/*.js', series('js'));
});