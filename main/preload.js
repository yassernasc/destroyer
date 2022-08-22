const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('local', {
  onScanUpdate: callback => ipcRenderer.on('new-album-found', callback),
  search: pathList => ipcRenderer.invoke('search', pathList),
})

contextBridge.exposeInMainWorld('menu', {
  addFiles: callback => ipcRenderer.on('add-files', callback),
})

contextBridge.exposeInMainWorld('lastfm', {
  connected: callback => ipcRenderer.on('lastfm:connected', callback),
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
