const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')
const { readFiles } = require('./app/rearEnd/readFiles.js')
require('./app/rearEnd/db.js')

if (process.env.NODE_ENV === 'development') {
  // hot reload
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

let win

let loadDevelopTools = () => {
  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

  win.webContents.openDevTools()

  // react devtool extension
  installExtension(REACT_DEVELOPER_TOOLS)
    .then( name => console.log(`Add Extension:  ${name}`))
    .catch( error => console.log(`An error occurred: `, error))
}

let createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on('load-images', (e, arg) => {
    let picturePath = path.join('/home/cwxyz', 'Pictures')
    let images = readFiles(picturePath)
    e.returnValue = images
  })
  
  if (process.env.NODE_ENV === 'development') loadDevelopTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win == null) createWindow()
})
