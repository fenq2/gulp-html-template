const { dest, src, watch, series, parallel, task } = require('gulp'),
	del = require('del');

module.exports = task('del', () => {
	return del('./build/**/*');
});