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

const LastFmService = require('./services/lastfm')

// Init Services
const lastfm = new LastFmService()

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

  mainWindow.loadFile('index.html')

  // Plug Components
  mainWindowState.manage(mainWindow)
  mainWindow.setTouchBar(createTouchBar())
  createMenu(mainWindow, lastfm)

  // Window Events
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => (mainWindow = null))
}

// App events
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

app.on('open-url', (event, url) => {
  event.preventDefault()
  if (url.includes('lastfm-auth')) {
    const token = new URL(url).searchParams.get('token')
    lastfm.events.emit('token-authenticated', token)
  }
})

lastfm.events.on('connected', payload =>
  mainWindow.webContents.send('lastfm:connected', payload)
)
lastfm.events.on('new-status', status => {
  if (status === 'disconnected') {
    mainWindow.webContents.send('lastfm:disconnected')
  }
})
lastfm.events.on('new-scrobble-status', status =>
  mainWindow.webContents.send('lastfm:new-scrobble-status', status)
)

// Events from renderer
ipcMain.handle('local:scan', (event, pathList) =>
  new LocalDisk(mainWindow).scan(pathList)
)
ipcMain.on('touch-bar:update-metadata', (event, metadata) =>
  updateMetadata(metadata)
)
ipcMain.on('lastfm:now-playing', (event, metadata) =>
  lastfm.nowPlaying(metadata)
)
ipcMain.on('lastfm:connected-start', (event, isConnected) =>
  lastfm.setInitialStatus(isConnected ? 'connected' : 'disconnected')
)
ipcMain.on('lastfm:scrobble', (event, metadata) => lastfm.scrobble(metadata))

// App Configuration
app.setName('Destroyer')
app.setAsDefaultProtocolClient('destroyer')
