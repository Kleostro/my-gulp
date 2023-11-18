// Добавление констант===================================

const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del')
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create()
const sass = require("gulp-sass") (require('sass'));
const fonter = require('gulp-fonter');
const fileinclude = require('gulp-file-include');
const typograf = require('gulp-typograf');




// Удаление папки dev==========================

const cleanDev = () => {
  return del(['dev'])
}

// Удаление папки build========================

const cleanBuild = () => {
  return del(['build'])
}

// Удаление всех папок=========================

const cleanAll = () => {
  return del(['dev', 'build'])
}

// папка libs dev=============================

const libsDev = () => {
  return src('src/libs/*.*')
  .pipe(dest('dev/libs'))
  .pipe(browserSync.stream())
  }

// папка libs build===========================

const libsBuild = () => {
  return src('src/libs/*.*')
  .pipe(dest('build/libs'))
  .pipe(browserSync.stream())
  }


// HTML INCLUDE dev=======================

const htmlFileIncludeDev = () => {
  return src('src/*.html')
   .pipe(fileinclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(typograf({ locale: ['ru', 'en-US'] }))
  .pipe(dest('dev'))
  .pipe(browserSync.stream())
  }


// HTML INCLUDE build=====================

const htmlFileIncludeBuild = () => {
  return src('src/*.html')
  .pipe(fileinclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(typograf({ locale: ['ru', 'en-US'] }))
  .pipe(htmlMin ({
    collapseWhitespace: true,
  }))
  .pipe(dest('build'))
  .pipe(browserSync.stream())
}
// CSS dev================================

const stylesDev = () => {
  return src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ["last 5 versions"]
  }))
  .pipe(sourcemaps.write())
  .pipe(dest('dev'))
  .pipe(browserSync.stream())
}


// CSS build==============================

const stylesBuild = () => {
  return src('src/scss/style.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ["last 5 versions"]
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(dest('build'))
  .pipe(browserSync.stream())
}

// Fonts dev================================

const fontsDev = () => {
return src(['src/fonts/*.woff', 'src/fonts/*.woff2'])
  .pipe(fonter({
        subset: [66,67,68, 69, 70, 71],
        formats: ['woff2', 'woff']
      }))
  .pipe(dest('dev/fonts'))
}

// Fonts build==============================

const fontsBuild = () => {
  return src(['src/fonts/*.woff', 'src/fonts/*.woff2'])
    .pipe(fonter({
          subset: [66,67,68, 69, 70, 71],
          formats: ['woff2', 'woff']
        }))
    .pipe(dest('build/fonts'))
  }

// JS dev=================================

const scriptsDev = () => {
  return src('src/js/**/*.js')
  .pipe(dest('dev/js'))
  .pipe(browserSync.stream())
}

// JS build=================================

const scriptsBuild = () => {
  return src('src/js/**/*.js')
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(dest('build/js'))
  .pipe(browserSync.stream())
}

// Спрайты dev==============================

const svgSpritesDev = () => {
  return src('src/img/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dev/img'))
}

// Спрайты build===============================

const svgSpritesBuild = () => {
  return src('src/img/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('build/img'))
}

// Images dev==================================

const imagesDev = () => {
  return src([
    'src/img/jpg/*.jpg',
    'src/img/jpeg/*.jpeg',
    'src/img/png/*.png',
    'src/img/webp/*.webp',
    'src/img/svg/*.svg',
    'src/img/*.svg',
  ])
  .pipe(dest('dev/img'))
}

// Images build================================

const imagesBuild = () => {
  return src([
    'src/img/jpg/*.jpg',
    'src/img/jpeg/*.jpeg',
    'src/img/png/*.png',
    'src/img/webp/*.webp',
    'src/img/svg/*.svg',
    'src/img/*.svg'
  ])
  .pipe(image())
  .pipe(dest('build/img'))
}

// Resources dev================================

const resourcesDev = () => {
  return src('src/resources/**')
  .pipe(dest('dev/resources'))
}

// Resources build==============================

const resourcesBuild = () => {
  return src('src/resources/**')
  .pipe(dest('build/resources'))
}


// WatchFiles dev=============================

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
}

// WatchFiles build===========================

const watchFilesBuild = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}


// Watch dev=====================================

watch('src/**/*.html', htmlFileIncludeDev)
watch('src/**/*.scss', stylesDev)
watch('src/img/**/*.*', imagesDev)
watch('src/img/svg/**/*.svg', svgSpritesDev)
watch('src/js/**/*.js', scriptsDev)
watch('src/libs/**/*.*', libsDev)
watch('src/resources/**', resourcesDev)

// Watch build====================================

watch('src/**/*.html', htmlFileIncludeBuild)
watch('src/**/*.css', stylesBuild)
watch('src/img/**/*.*', imagesBuild)
watch('src/img/svg/**/*.svg', svgSpritesBuild)
watch('src/js/**/*.js', scriptsBuild)
watch('src/libs/**/*.*', libsBuild)
watch('src/resources/**', resourcesBuild)



exports.cleanDev = cleanDev
exports.cleanBuild = cleanBuild
exports.cleanAll = cleanAll
exports.default = series(cleanDev, resourcesDev, libsDev, htmlFileIncludeDev, scriptsDev, stylesDev, fontsDev, imagesDev, svgSpritesDev, watchFilesDev)
exports.build = series(cleanBuild, resourcesBuild, libsBuild, htmlFileIncludeBuild, scriptsBuild, stylesBuild, fontsBuild, imagesBuild, svgSpritesBuild, watchFilesBuild)
