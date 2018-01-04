var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'), 
    uglify         = require('gulp-uglifyjs'),
    del            = require('del'),
    cache          = require('gulp-cache'),
    fileinclude    = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html'),
    autoprefixer   = require('gulp-autoprefixer'),
    htmlhint       = require('gulp-htmlhint');

gulp.task('sass', ['header-sass', 'minify-css', 'minify-fonts'], function() {
  return gulp.src('app/sass/main.sass')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('header-sass', function() {
  return gulp.src('app/sass/header.sass')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', function() {
  return gulp.src(['app/libs/owlcarousel/owl.carousel.min.css', 'app/libs/owlcarousel/owl.theme.default.min.css', 'app/libs/magnific-popup/magnific-popup.css', 'app/css/main.css'])
  .pipe(cleanCSS({debug: true}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(concat('main.css')) 
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('minify-fonts', function() {
  return gulp.src('app/css/fonts.css')
  .pipe(cleanCSS({debug: true}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('minify-libs', function() {
  return gulp.src(['app/libs/jquery-3.1.1.min.js', 'app/libs/html5shiv.min.js', 'app/libs/classie.js', 'app/libs/magnific-popup/jquery.magnific-popup.min.js', 'app/libs/jquery.appear.js', 'app/libs/typed.min.js', 'app/libs/smooth-scroll.min.js', 'app/libs/owlcarousel/owl.carousel.min.js', 'app/libs/masonry/imagesloaded.pkgd.min.js', 'app/libs/masonry/masonry.pkgd.min.js', 'app/js/ajax.js', 'app/js/common.js']) 
  .pipe(concat('minify-libs.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
    /*port: 80,
    tunnel: true,
    tunnel: "bakery"*/
  });
});


gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('htmlhint', function() {
  return gulp.src('app/*.html')
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
  .pipe(htmlhint.failReporter({suppress: true}));
});

gulp.task('watch', ['browser-sync', 'htmlhint', 'sass'], function() {  
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/libs/**/*', browserSync.reload);
});

gulp.task('build', ['clean', 'buildhtml'], function() { //  Настраеваем билд после завершения лендинга
  
  var buildCSS = gulp.src(['app/css/fonts.min.css', 'app/css/header.min.css', 'app/css/main.min.css'])
  .pipe(gulp.dest('dist/css'));
  
  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
  
  var buildImg = gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'));
  
  var buildJS = gulp.src('app/js/minify-libs.js')
  .pipe(gulp.dest('dist/js'));
  
  var buildHTML = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
  
  var buildPHP = gulp.src('app/*.php')
  .pipe(gulp.dest('dist'));
  
});

gulp.task('default', ['watch']);