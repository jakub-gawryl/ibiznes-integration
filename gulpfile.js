const {src, dest, series} = require('gulp')
const ts = require('gulp-typescript')
const del = require('del')
const merge = require('merge2');

const targetDir = './dist'
const project = ts.createProject('tsconfig.json', {
  declaration: true
})

const clean = () => del([targetDir])

const parseTS = () => {
  const tsResult = src("src/**/*.ts").pipe(project())
  return merge(
    tsResult.dts.pipe(dest(targetDir)),
    tsResult.js.pipe(dest(targetDir))
  )
}

const copyFiles = () => src("src/**/*.*", {ignore: "src/**/*.ts"}).pipe(dest(targetDir));

exports.build = series(
  clean,
  parseTS,
  copyFiles
)