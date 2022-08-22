const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const createMenu = (window, lastfm) => {
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
      label: 'Library',
      submenu: [
        {
          click: () => window.webContents.send('local:rescan'),
          label: 'Rescan',
        },
      ],
    },
    {
      label: 'Services',
      submenu: [
        {
          label: 'Last.fm',
          submenu: [
            {
              click: () => lastfm.startConnection(),
              enabled: false,
              id: 'lastfm-sign-in',
              label: 'Sign In',
              visible: true,
            },
            {
              enabled: false,
              id: 'lastfm-sign-in-loading',
              label: 'Signing In..',
              visible: false,
            },
            {
              click: () => lastfm.disconnect(),
              id: 'lastfm-sign-out',
              label: 'Sign Out',
              visible: false,
            },
            {
              id: 'lastfm-separator',
              type: 'separator',
              visible: false,
            },
            {
              checked: true,
              click: ({ checked }) => lastfm.updateScrobbleToogle(checked),
              id: 'lastfm-scrobble',
              label: 'Scrobble Tracks',
              type: 'checkbox',
              visible: false,
            },
          ],
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload()
            }
          },
          label: 'Reload',
        },
        {
          accelerator: isMac ? 'Ctrl+Command+F' : 'F11',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          },
          label: 'Toggle Full Screen',
        },
        {
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => {
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

  const updateLastfmMenus = status => {
    const signInMenuItem = menu.getMenuItemById('lastfm-sign-in')
    const signInLoadingMenuItem = menu.getMenuItemById('lastfm-sign-in-loading')
    const signOutMenuItem = menu.getMenuItemById('lastfm-sign-out')
    const separatorMenuItem = menu.getMenuItemById('lastfm-separator')
    const scrobbleMenuItem = menu.getMenuItemById('lastfm-scrobble')

    switch (status) {
      case 'connected': {
        signOutMenuItem.visible = true
        separatorMenuItem.visible = true
        scrobbleMenuItem.visible = true
        signInMenuItem.visible = false
        signInLoadingMenuItem.visible = false
        break
      }
      case 'connecting': {
        signInMenuItem.visible = false
        signInLoadingMenuItem.visible = true
        break
      }
      case 'disconnected': {
        signInMenuItem.enabled = true
        signInMenuItem.visible = true
        signInLoadingMenuItem.visible = false
        signOutMenuItem.visible = false
        separatorMenuItem.visible = false
        scrobbleMenuItem.visible = false
        scrobbleMenuItem.checked = true
        break
      }
    }
  }

  updateLastfmMenus(lastfm.status)
  lastfm.events.on('new-status', updateLastfmMenus)
  lastfm.events.on('initial-status', updateLastfmMenus)

  return menu
}

module.exports = createMenu
