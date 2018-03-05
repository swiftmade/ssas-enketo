var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var replace = require('gulp-replace');
var browserify = require('browserify');
var uglifyCss = require("gulp-uglifycss");
var source = require('vinyl-source-stream');

var Paths = {
    src: {
        js: './src/js/',
        sass: './src/sass/',
    },
    dist: {
        js: './www/build/js/',
        css: './www/build/css/',
        fonts: './www/build/fonts/',
    },
    vendor: {
        enketo: 'node_modules/enketo-core/src/',
    },
    node_modules: require('path').resolve(__dirname, 'node_modules'),
};

gulp.task('vendor-fixes', function() {
    return gulp.src(Paths.vendor.enketo + '/widget/**/*.scss')
        .pipe(replace(/["^](.*)\/node_modules/g, '"node_modules'))
        .pipe(gulp.dest(Paths.vendor.enketo + '/widget'));
});

gulp.task('enketo-sass', function() {
    return gulp.src(Paths.vendor.enketo + '/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(flatten())
        .pipe(rename({ extname: '.scss' }))
        .pipe(gulp.dest(Paths.src.sass + 'enketo'));
});

gulp.task('sass', function() {
    return gulp.src([
            Paths.src.sass + 'survey.scss',
            Paths.src.sass + 'submissions.scss',
        ])
        .pipe(sass({includePaths: [Paths.node_modules, '.']}).on('error', sass.logError))
        .pipe(uglifyCss())
        .pipe(gulp.dest(Paths.dist.css));
});

gulp.task('fonts', function() {
    return gulp.src([
        Paths.node_modules + '/font-awesome/fonts/fontawesome-webfont.*'
    ])
    .pipe(gulp.dest(Paths.dist.fonts));
});

gulp.task('style', ['vendor-fixes', 'enketo-sass', 'sass']);

gulp.task('browserify-app', function() {
    //
    return browserify(Paths.src.js + 'enketo.webform.js')
        .bundle()
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(source('enketo-bundle.js'))
        .pipe(gulp.dest(Paths.dist.js))
        .pipe(notify("Browserified!"));
});

gulp.task('browserify-submissions', function() {
    //
    return browserify(Paths.src.js + 'submissions.js')
        .bundle()
        .pipe(source('submissions-bundle.js'))
        .pipe(gulp.dest(Paths.dist.js));
});

gulp.task('browserify-localization', function() {
    return browserify(Paths.src.js + 'modules/i18n/i18n.js')
        .bundle()
        .pipe(source('i18n-bundle.js'))
        .pipe(gulp.dest(Paths.dist.js));
})

gulp.task('uglify', function() {
    return gulp.src(Paths.dist.js + '**/*.js')
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Paths.dist.js));
});

gulp.task('watch', function() {
    
    watch(Paths.src.sass + '**/*.scss', function() {
        gulp.start('style');
    });
    
    watch(Paths.src.js + '**/*.js' , function() {
        gulp.start('compile');
    });
});

gulp.task('compile', [
    'browserify-localization',
    'browserify-app',
    'browserify-submissions'
]);

gulp.task('dev', ['style', 'compile', 'watch']);
gulp.task('build', ['style', 'compile', 'uglify', 'fonts']);
gulp.task('default', ['build']);