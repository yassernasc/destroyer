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
                accelerator: 'Command+,',
                click: () => window.webContents.send('add-files'),
                label: 'Add Files...',
              },
              {
                accelerator: 'Command+Q',
                click: () => app.quit(),
                label: 'Quit',
              },
            ],
          },
        ]
      : []),
    {
      label: 'View',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload()
            }
          },
          label: 'Reload',
        },
        {
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          },
          label: 'Toggle Full Screen',
        },
        {
          accelerator:
            process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools()
            }
          },
          label: 'Toggle Developer Tools',
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+M',
          label: 'Minimize',
          role: 'minimize',
        },
        {
          accelerator: 'CmdOrCtrl+W',
          label: 'Close',
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
