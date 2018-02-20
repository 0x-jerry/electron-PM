const fs = require('fs')
const path = require('path')
const userSetting = require('electron-settings')
const { ipcMain } = require('electron')

function readFilesSync(filePath) {
  if(!fs.existsSync(filePath)) return null

  let images = []

  let files = fs.readdirSync(filePath)

  files.forEach(file => {
    let stats = fs.statSync(path.join(filePath, file))

    if (stats.isFile() && file.match(/\.(png|jpg|gif)$/)) {
      images.push(path.join(filePath, file))
    }
  })

  return images
}

function init() {
  ipcMain.on('load-images-sync', (e, arg) => {
    let paths = userSetting.get('paths', ['./'])
    let images = []

    paths.forEach(path => {
      images = images.concat(readFilesSync(path))
    })

    e.returnValue = images
  })
}

module.exports = {
  initIpcMain: init
}
