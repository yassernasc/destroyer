const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('local', {
  onAlbumFound: callback => ipcRenderer.on('new-album-found', callback),
  search: pathList => ipcRenderer.invoke('search', pathList),
})

contextBridge.exposeInMainWorld('menu', {
  addFiles: callback => ipcRenderer.on('add-files', callback),
})

contextBridge.exposeInMainWorld('touchBar', {
  updateMetadata: metadata =>
    ipcRenderer.send('update-touch-bar-metadata', metadata),
})
