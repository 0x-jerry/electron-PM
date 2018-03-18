const fs = require('fs')
const Path = require('path')
const db = require('./db.js')()
const userSetting = require('electron-settings')
const {
  shell,
  dialog,
  ipcMain,
  nativeImage,
  BrowserWindow,
} = require('electron')
const electron = require('electron')

function readFilesSync(filePath) {
  if (!fs.existsSync(filePath)) return null

  const images = []

  const files = fs.readdirSync(filePath)

  files.forEach((file) => {
    const stats = fs.statSync(Path.join(filePath, file))

    if (stats.isFile() && file.match(/\.(png|jpg|gif)$/)) {
      images.push(Path.join(filePath, file))
    }
  })

  return images
}

function init() {
  ipcMain.on('reload-images-sync', (e) => {
    const paths = userSetting.get('paths', [])
    let images = []

    paths.forEach((path) => {
      images = images.concat(readFilesSync(path))
    })

    db.transaction(() => {
      images.forEach((path) => {
        if (!db.getImage(path)) db.insertImage(path)
      })
    })()

    e.returnValue = images
  })

  ipcMain.on('get-all-images-sync', (e) => {
    try {
      e.returnValue = db.getAllImages().map(item => item.path)
    } catch (error) {
      console.log(error);
      e.returnValue = false
    }
  })

  ipcMain.on('add-image-tag', (e, arg) => {
    try {
      if (!db.getImageTag(arg.path, arg.tag)) db.insertImageTag(arg.path, arg.tag)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('delete-image-tag', (e, arg) => {
    try {
      db.deleteImageTag(arg.path, arg.tag)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('get-all-tags-sync', (e) => {
    try {
      e.returnValue = db.getAllTags()
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('add-tag-sync', (e, arg) => {
    try {
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

  ipcMain.on('open-folder', (e, arg) => {
    shell.showItemInFolder(arg.path)
  })

  ipcMain.on('save-file', (e, arg) => {
    dialog.showSaveDialog({
      title: 'save as',
      defaultPath: userSetting.get('last-open-path', null),
      filters: [{
        name: 'Images',
        extensions: ['png', 'jpg'],
      }],
    }, (p) => {
      if (!p) return
      userSetting.set('last-open-path', p)
      const ext = Path.extname(p)
      const image = nativeImage.createFromPath(arg.path)
      const data = ext === '.png' ? image.toPNG() : image.toJPEG(90)

      fs.writeFile(p, data, (error) => {
        if (error) console.log(error)
      })
    })
  })

  ipcMain.on('context-menu', () => {
    const parentWin = BrowserWindow.getFocusedWindow()
    const cursor = electron.screen.getCursorScreenPoint()

    let win = new BrowserWindow({
      show: false,
      frame: process.env.NODE_ENV === 'development',
      width: 200,
      height: 300,
      x: cursor.x,
      y: cursor.y,
      resizable: false,
      parent: parentWin,
    })

    win.loadURL(`file://${__dirname}/utils/contextmenu.html`)

    win.once('ready-to-show', () => {
      win.show()
    })

    win.on('blur', () => {
      win.close()
      win = null
    })
  })
}

module.exports = {
  initIpcMain: init,
}
