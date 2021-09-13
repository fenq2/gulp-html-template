'use strict';

const { dest, src, watch, series, parallel, task } = require('gulp');
const requireDir = require('require-dir');
const server = require('./gulp/tasks/server');
requireDir('./gulp/tasks/');

const dev = series(
    'del',
    parallel(
        'html',
        'styles',
        'scripts',
        'libs',
        'fonts',
        'images',
        'sprites'
    )
);
const build = series(
    'del',
    '_styles',
    parallel(
        '_scripts',
        '_html',
        'libs',
        '_images',
        'sprites',
        'fonts'
    )
);

module.exports.dev = series(dev, 'browser-sync');
module.exports.build = series(build);
