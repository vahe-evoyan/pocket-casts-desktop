const {app, BrowserWindow} = require('electron');
const EventEmitter = require('events');
const path = require('path');
const url = require('url');

class WindowManager extends EventEmitter {
  createWindow() {
    this.window = new BrowserWindow({width: 800, height: 600});
  }

  initWindow() {
    this.window.on('closed', this.onClosed.bind(this));
    this.window.loadURL(url.format({
      pathname: path.join(app.getAppPath(), 'src', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  onClosed() {
    this.window = null;
    this.emit('closed');
  }

  closed() {
    return !this.window;
  }
}

module.exports = WindowManager;
