const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const createMenu = window => {
  const menu = Menu.buildFromTemplate([
    ...(isMac
      ? [
          {
            label: 'Destroyer',
            submenu: [
              {
                label: 'Add Files...',
                accelerator: 'Command+,',
                click: () => window.webContents.send('add-files'),
              },
              {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => app.quit(),
              },
            ],
          },
        ]
      : []),
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          },
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
        ...(isMac
          ? [
              {
                type: 'separator',
              },
              {
                label: 'Bring All to Front',
                role: 'front',
              },
            ]
          : []),
      ],
    },
  ])

  Menu.setApplicationMenu(menu)
}

module.exports = createMenu
