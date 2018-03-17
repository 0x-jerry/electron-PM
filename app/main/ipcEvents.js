const fs = require('fs')
const path = require('path')
const db = require('./db.js')()
const userSetting = require('electron-settings')
const { ipcMain, shell, nativeImage, dialog } = require('electron')

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
  ipcMain.on('reload-images-sync', (e, arg) => {
    let paths = userSetting.get('paths', [])
    let images = []

    paths.forEach(path => {
      images = images.concat(readFilesSync(path))
    })

    db.transaction(() => {
      images.forEach(path => {
        if(!db.getImage(path)) db.insertImage(path)
      })
    })()

    e.returnValue = images
  })

  ipcMain.on('get-all-images-sync', (e, arg) => {
    try {
      e.returnValue = db.getAllImages().map(item => item.path)
    } catch (error) {
      console.log(error);
      e.returnValue = false
    }
  })

  ipcMain.on('add-image-tag', (e, arg) => {
    try {
      if(!db.getImageTag(arg.path, arg.tag)) db.insertImageTag(arg.path, arg.tag)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('delete-image-tag', (e,arg) => {
    try {
      db.deleteImageTag(arg.path, arg.tag)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('get-all-tags-sync', (e, arg) => {
    try {
      e.returnValue = db.getAllTags()
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('add-tag-sync', (e, arg) => {
    try{
      db.insertTag(arg.text, arg.color)
      e.returnValue = true
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('delete-tag-sync', (e, arg) => {
    try {
      db.deleteTag(arg.text, arg.force)
      e.returnValue = true
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('get-image-tags-sync', (e, arg) => {
    try {
      e.returnValue = db.getImageTags(arg.path)
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('open-file', (e, arg) => {
    shell.openItem(arg.path)
  })

  ipcMain.on('save-file', (e, arg) => {
    dialog.showSaveDialog({
      title: 'save as',
      defaultPath: userSetting.get('last-open-path', null),
      filters: [{
        name: 'Images', extensions: ['png', 'jpg']
      }]
    }, (p) => {
      if (!p) return
      userSetting.set('last-open-path', p)
      let ext = path.extname(p)
      let image = nativeImage.createFromPath(arg.path)
      let data = ext == '.png' ? image.toPNG() : image.toJPEG(90)

      fs.writeFile(p, data, (error) => {
        error && console.log(error)
      })
    })
  })
}

module.exports = {
  initIpcMain: init
}
