var gulp = require('gulp');
var sass = require('gulp-sass');
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

gulp.task('style', gulp.series(
    'vendor-fixes',
    'enketo-sass',
    'sass',
));

gulp.task('fonts', function() {
    return gulp.src([
        Paths.node_modules + '/font-awesome/fonts/fontawesome-webfont.*'
    ])
    .pipe(gulp.dest(Paths.dist.fonts));
});

gulp.task('browserify-app', function() {
    //
    return browserify(Paths.src.js + 'enketo.webform.js')
        .bundle()
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(source('enketo-bundle.js'))
        .pipe(gulp.dest(Paths.dist.js));
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
    return gulp
      .src([
        Paths.dist.js + "enketo-bundle.js",
        Paths.dist.js + "i18n-bundle.js",
        Paths.dist.js + 'submissions-bundle.js',
      ])
      .pipe(uglify().on("error", function(e) {
          console.log(e);
        }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(Paths.dist.js));
});

gulp.task('watch', function() {
    gulp.watch(Paths.src.js + '**/*.js', gulp.parallel('compile'));
    gulp.watch(Paths.src.sass + '**/*.scss', gulp.parallel('style'));
});

gulp.task('compile', gulp.parallel(
    'browserify-localization',
    'browserify-app',
    'browserify-submissions',
));

gulp.task('build', gulp.parallel(
    'style',
    gulp.series('compile', 'uglify'),
    'fonts',
));

gulp.task('default', gulp.series('build'));