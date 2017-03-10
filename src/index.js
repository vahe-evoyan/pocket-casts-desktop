const {app, BrowserWindow, Menu, globalShortcut} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  });

  globalShortcut.register('MediaNextTrack', function() {
    console.log('MediaNextTrack');
  });
  globalShortcut.register('MediaPreviousTrack', function() {
    console.log('MediaPreviousTrack');
  });
  globalShortcut.register('MediaPlayPause', function() {
    console.log('MediaPlayPause');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
