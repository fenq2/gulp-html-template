const { dest, src, watch, series, parallel, task } = require('gulp'),
	del = require('del'),
	copyDist = require('gulp-npm-dist');

module.exports = task('copyModules', (cb) => {
	del('./src/libs').then(() => {
		src(copyDist(), { base: './node_modules/' })
		  .pipe(dest('./build/libs')).on('end', cb)
	}).catch(cb)
});
