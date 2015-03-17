var
path = require('path'),

// Gulp plugins
gulp = require('gulp'),
gutil = require('gulp-util'),
spawn = require('gulp-spawn-shim'),
rename = require('gulp-rename'),
watch = require('gulp-watch'),
plumb = require('gulp-plumber'),
ignore = require('gulp-ignore'),

// Config
src_docs = './src/',
dest_docs = './dist/';

gulp.task('default', function() {

    var
    opts = {};
    opts.cmd = 'pandoc';
    opts.args = [];

    // Standalone
    opts.args.push('-s');

    // Use reveal.js
    opts.args.push('--to=revealjs');

    // Set revealjs location
    opts.args.push("--variable=revealjs-url:http://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.0.0")

    // Set theme
    opts.args.push("--variable=theme:script")

    var magic = function(file, opts, cb) {
        return cb(file, opts);
    };

    watch({glob: path.join(src_docs, '**/*.md') })
        .on('error', console.log)
        .pipe(plumb())
        .pipe(ignore({isDirectory:true}))
            .on('data', function(file) {
                file.orig_path = file.path;
            })
        .pipe(spawn(opts, magic))
            .on('failure', console.log)
        .pipe(rename({ext: ".html"}))
        .pipe(gulp.dest(dest_docs))
            .on('data', function(file) {
                if(!file.path)
                    return;
                var
                abs_path_to = path.normalize(__dirname + '/' + file.path),
                to = path.normalize(dest_docs + '/' + path.relative(__dirname + '/' + src_docs, abs_path_to)),
                from = path.relative(__dirname, file.orig_path);

                gutil.log("Compiled '" + from + "' to '" + to + "'");

            });
});
