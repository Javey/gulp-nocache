/**
 * @fileoverview
 * @author javey
 * @date 14-12-22
 */

var through = require('through2'),
    gutil = require('gulp-util'),
    path = require('path'),
    Processor = require('web-nocache').Processor;

const PLUGIN_NAME = 'gulp-nocache';

map = {};

function nocache(options) {
    options = options || {
        type: 'media',
        dest: '[path][name].[ext]',
        sourceContext: '',
        outputContext: ''
    };
    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported'));
            return cb();
        }

        var contents = options.type === 'media' ? file.contents : file.contents.toString(),
            processor = Processor.getInstance(options.type),
            outputFile = path.resolve(processor._getFilename(options.dest, file.path, options.sourceContext, contents));

        processor.setMap(map);
        contents = processor.process(contents, file.path, outputFile, options);
        file.contents = options.type === 'media' ? contents : new Buffer(contents);

        map[file.path] = outputFile;

        file.path = outputFile;
        file.base = path.dirname(outputFile);

        this.push(file);

        cb();
    });
}

module.exports = nocache;