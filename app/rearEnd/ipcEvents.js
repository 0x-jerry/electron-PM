const fs = require('fs')
const path = require('path')
const db = require('./db.js')()
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

    images.forEach(path => {
      try {
        db.insertImage(path)
      } catch (e) {

      }
    })

    e.returnValue = images
  })

  ipcMain.on('add-image-tag', (e, arg) => {
    try {
      db.insertImageTag(arg.path, arg.tag)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('get-all-tags-sync', (e, arg) => {
    e.returnValue = db.getAllTags()
  })

  ipcMain.on('add-tag-sync', (e, arg) => {
    try{
      db.insertTag(arg.text, arg.color)
      e.returnValue = 'ok'
    } catch (error) {
      console.log(error)
      e.returnValue = error
    }
  })

}

module.exports = {
  initIpcMain: init
}
