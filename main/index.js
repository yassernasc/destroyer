const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const {default: installExtensions, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} = require('electron-devtools-installer');
const path = require('path')

const LocalDisk = require('./services/local');
const createMenu = require('./services/menu');
const createTouchBar = require('./services/touchBar');

let mainWindow

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 800
  })
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    darkTheme: true,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindowState.manage(mainWindow)
  mainWindow.loadFile('index.html')
  mainWindow.setTouchBar(createTouchBar())
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => mainWindow = null)

  createMenu(mainWindow)
  ipcMain.handle('search', (event, pathList) => new LocalDisk(mainWindow).search(pathList))
}

app.whenReady().then(() => {
  const isDev = !app.isPackaged
  if (isDev) {
    installExtensions([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      loadExtensionOptions: { allowFileAccess: true }
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
