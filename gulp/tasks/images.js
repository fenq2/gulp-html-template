const { dest, src, watch, series, parallel, task } = require('gulp'),
	imagemin = require('gulp-imagemin'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imageminPngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache');

module.exports = task('images', () => {
	return src(['src/images/**/*.{png,jpg,gif,svg}',
		'!./src//images/svg/*'])
		.pipe(dest('./build/images/'))
});

module.exports = task('_images', () => {
	return src('src/images/**/*.{png,jpg,gif,svg}')
	.pipe(imagemin([                            // сжатие изображений без потери качества
		imageminMozjpeg({
      progressive: true,
      quality: 85
    }),                           // сжатие jpeg
		imageminPngquant({
      speed: 5,
      quality: [0.6, 0.8]
    }),                             // сжатие png
	], {
		progressive: true,
		strip: true
	}))
		.pipe(dest('./build/images/'))
});
