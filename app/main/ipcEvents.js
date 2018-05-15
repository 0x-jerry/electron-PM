const fs = require('fs')
const Path = require('path')
const userSetting = require('electron-settings')
const {
  shell,
  dialog,
  ipcMain,
  nativeImage,
} = require('electron')
const sqlite = require('./modules/sqlite3.js')
const Images = require('./modules/images.js')
const Tags = require('./modules/tags.js')
const ImageTags = require('./modules/imageTags.js')

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
  Images.createTable()
  Tags.createTable()
  ImageTags.createTable()

  ipcMain.on('reload-images-sync', (e) => {
    const paths = userSetting.get('paths', [])
    let images = []

    paths.forEach((path) => {
      images = images.concat(readFilesSync(path))
    })

    sqlite.transaction(() => {
      images.forEach((path) => {
        if (!Images.get(path)) Images.create(path)
      })
    })()

    e.returnValue = Images.getAll()
  })

  ipcMain.on('get-all-images-sync', (e) => {
    try {
      e.returnValue = Images.getAll()
    } catch (error) {
      console.log(error);
      e.returnValue = false
    }
  })

  ipcMain.on('add-image-tag', (e, arg) => {
    try {
      if (!ImageTags.get(arg.tag, arg.path)) ImageTags.create(arg.tag, arg.path)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('delete-image-tag', (e, arg) => {
    try {
      ImageTags.destroy(arg.tag, arg.path)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.on('get-all-tags-sync', (e) => {
    try {
      e.returnValue = Tags.getAll()
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('add-tag-sync', (e, arg) => {
    try {
      Tags.create(arg.text, arg.color)
      e.returnValue = true
    } catch (error) {
      e.returnValue = false
    }
  })

  ipcMain.on('delete-tag-sync', (e, arg) => {
    try {
      Tags.destroy(arg.text, arg.force)
      e.returnValue = true
    } catch (error) {
      console.log(error);
      e.returnValue = false
    }
  })

  ipcMain.on('get-tags-by-image-sync', (e, arg) => {
    try {
      e.returnValue = Tags.getsByImage(arg.path)
    } catch (error) {
      console.log(error);
      e.returnValue = false
    }
  })

  ipcMain.on('get-images-by-tag-sync', (e, arg) => {
    try {
      e.returnValue = Images.getsByTag(arg.text)
    } catch (error) {
      console.log(error);
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

  ipcMain.on('get-file-size-sync', (e, arg) => {
    try {
      const state = fs.statSync(arg.path)
      e.returnValue = state.size
    } catch (error) {
      e.returnValue = 0;
    }
  })
}

module.exports = {
  initIpcMain: init,
}
