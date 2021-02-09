const gulp = require("gulp");//обращение к галпу
const rename = require("gulp-rename");//плагин на переименование при копировании
const sass = require("gulp-sass");//плагин для работы сасс
const autoprefixer = require("gulp-autoprefixer");//плагин для добавления префиксов в стили для старых браузеров
const sourcemaps = require("gulp-sourcemaps");//плагин для отображения в читаемом виде

function conwertSass(data) {
    gulp.src("./scss/**/*.scss")//адрес исходника
        .pipe(sourcemaps.init())//запуск написания карты 
        .pipe(sass({
            errLogToConsole: true,//оповещает об ошибках
            outputStyle: "compressed"//минифицирует файл
        }))//конвертация сасс в сисс
        .on("error", console.error.bind(console))//записыванет ошибку в консоль
        .pipe(autoprefixer({
            cascade: false
        }))//добавляет префиксы
        .pipe(rename({suffix: ".min"}))//переименовует с добавлением суфикса файл
        .pipe(sourcemaps.write("./"))//записывает файл с исходкой должно быть перед копированием
        .pipe(gulp.dest("./css/"))//адрес куда копировать
    data();
};//функция копирует scss файл конвертирую и минифицируя в css

function watchSass() {
    gulp.watch("./scss/**/*", conwertSass)
}

// exports.default = conwertSass;

gulp.task("default", gulp.series(conwertSass, watchSass))