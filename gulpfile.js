//utils
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const del = require('del')
const zip = require('gulp-zip')

//css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//babel + browserify
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

// image compression
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

// CONSTANT VARS
const DIST_PATH = 'dist/';
const LOCALWP_MYCUSTOMTHEME_PATH = 'localwp/wp-content/themes/mycustomtheme/';
const IMAGES_PATH = 'src/_wptheme/img/**/*.{png,jpeg,jpg,svg,gif}';
const PROXY_PATH = `http://localhost:[port number -- 8888 or 8080 most likely]/path/to/where/you/cloned/gulp__wordpress`;

gulp.task('default', ['clean', 'images', 'sass', 'babel', 'wordpress', 'browsersync'], () => {
    gulp.watch("./localwp/**/*").on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', ['sass', 'update-style']);
    gulp.watch('./src/js/*.js', ['babel']);
    gulp.watch('./src/_wptheme/**/*', ['wordpress']);
});

gulp.task('browsersync', function() { // NOTE initial working version: browsersync@2.18.8
    browserSync.init({
        proxy: PROXY_PATH,
        notify: true,
    });
})

gulp.task( 'wordpress', () => gulp.src('./src/_wptheme/**/*').pipe(gulp.dest(LOCALWP_MYCUSTOMTHEME_PATH)).pipe(browserSync.stream()) );

gulp.task('sass', function() {
    const plugins = [autoprefixer({browsers: ['last 2 versions']}), cssnano()];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({
           basename: 'style'
        }))
        .pipe(gulp.dest('./src/_wptheme/'))
        // .pipe(browserSync.stream());
});

gulp.task('update-style', function() {
    const plugins = [autoprefixer({browsers: ['last 2 versions']}), cssnano()];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({
           basename: 'style'
        }))
        .pipe(gulp.dest(LOCALWP_MYCUSTOMTHEME_PATH))
        .pipe(browserSync.stream());
});


gulp.task('babel', function() {
    browserify({
        entries: './src/js/custom-scripts.js',
        debug: true
    })
    .transform(babelify, { presets: ['env'] })
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('custom-scripts.min.js'))
    .pipe(gulp.dest('./src/_wptheme/js/'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(IMAGES_PATH)
               .pipe(imagemin(
                  [
                    imagemin.gifsicle(),
                    imagemin.jpegtran(),
                    imagemin.optipng(),
                    imagemin.svgo(),
                    imageminPngQuant(),
                    imageminJpegRecompress()
                  ]
               ))
               .pipe(gulp.dest(LOCALWP_MYCUSTOMTHEME_PATH + 'img'))
});

gulp.task('clean', function() {
  console.log('Cleaning...')
  return del.sync([
    '!' + LOCALWP_MYCUSTOMTHEME_PATH + '.git',
    LOCALWP_MYCUSTOMTHEME_PATH + '**/*'
   ]);
});

gulp.task('export', function() {
  return gulp.src(LOCALWP_MYCUSTOMTHEME_PATH + '**/*')
             .pipe(zip('website.zip'))
             .pipe(gulp.dest('./'))
});
