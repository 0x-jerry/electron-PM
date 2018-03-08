const fs = require('fs')
const url = require('url')
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const db = require('./app/rearEnd/db.js')()
const { initIpcMain } = require('./app/rearEnd/ipcEvents.js')

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  // hot reload
  require('electron-reload')([
    path.join(__dirname, 'app', 'src')
  ], {
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

  initIpcMain()
  
  if (process.env.NODE_ENV === 'development') loadDevelopTools()
}

app.on('ready', createWindow)

app.on('close', () => {
  db.close()
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win == null) createWindow()
})
