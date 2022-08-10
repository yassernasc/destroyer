const { app, BrowserWindow, ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const {
  default: installExtensions,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer')
const path = require('path')

const LocalDisk = require('./services/local')
const createMenu = require('./components/menu')
const { createTouchBar, updateMetadata } = require('./components/touchBar')

let mainWindow

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultHeight: 800,
    defaultWidth: 1200,
  })
  mainWindow = new BrowserWindow({
    darkTheme: true,
    height: mainWindowState.height,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: mainWindowState.width,
    x: mainWindowState.x,
    y: mainWindowState.y,
  })
  mainWindowState.manage(mainWindow)
  mainWindow.loadFile('index.html')
  mainWindow.setTouchBar(createTouchBar())
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => (mainWindow = null))

  createMenu(mainWindow)

  ipcMain.handle('search', (event, pathList) =>
    new LocalDisk(mainWindow).search(pathList)
  )
  ipcMain.on('update-touch-bar-metadata', (event, metadata) =>
    updateMetadata(metadata)
  )
}

app.whenReady().then(() => {
  const isDev = !app.isPackaged
  if (isDev) {
    installExtensions([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      loadExtensionOptions: { allowFileAccess: true },
    })
  }

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
