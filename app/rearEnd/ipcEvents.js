const fs = require('fs')
const path = require('path')
const { ipcMain } = require('electron')
const { loadConfig } = require('./util.js')

function readFiles(filePath) {
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

function init(configPath) {
  let config = loadConfig(configPath)

  ipcMain.on('load-images', (e, arg) => {
    let images = readFiles(config.path)
    e.returnValue = images
  })
  
}

module.exports = {
  initIpcMain: init
}
