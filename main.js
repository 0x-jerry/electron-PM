const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

// hot reload
if (process.env.NODE_ENV == 'development') require('electron-reload')(__dirname)

let win

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

  win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win == null) createWindow()
})
