import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

const clean = () => del(["src/static"]);

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserlist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      bro({
        // trasnform에 2개가 들어감.
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watch = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

export const dev = gulp.series(clean, styles, js, watch);
export const build = gulp.series(clean, styles, js);
