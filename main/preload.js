const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('local', {
  onScanUpdate: callback => ipcRenderer.on('new-album-found', callback),
  rescan: callback => ipcRenderer.on('local:rescan', callback),
  scan: pathList => ipcRenderer.invoke('local:scan', pathList),
})

contextBridge.exposeInMainWorld('menu', {
  addFiles: callback => ipcRenderer.on('add-files', callback),
})

contextBridge.exposeInMainWorld('lastfm', {
  connected: callback => ipcRenderer.on('lastfm:connected', callback),
  connectedStart: flag => ipcRenderer.send('lastfm:connected-start', flag),
  disconnected: callback => ipcRenderer.on('lastfm:disconnected', callback),
  nowPlaying: metadata => ipcRenderer.send('lastfm:now-playing', metadata),
  onScrobblingToogleUpdate: callback =>
    ipcRenderer.on('lastfm:new-scrobble-status', callback),
  scrobble: metadata => ipcRenderer.send('lastfm:scrobble', metadata),
})

contextBridge.exposeInMainWorld('touchBar', {
  updateMetadata: metadata =>
    ipcRenderer.send('touch-bar:update-metadata', metadata),
})

contextBridge.exposeInMainWorld('env', {
  os: process.platform,
})
