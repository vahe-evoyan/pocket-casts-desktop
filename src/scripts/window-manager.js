const {app, BrowserWindow} = require('electron');
const EventEmitter = require('events');
const path = require('path');
const url = require('url');

const IPC_NAMESPACE = 'PocketCasts';

class WindowManager extends EventEmitter {
  createWindow() {
    this.window = new BrowserWindow({
      width: 980,
      height: 660,
      minWidth: 980,
      minHeight: 660
    });
  }

  initWindow() {
    this.window.on('closed', this.onClosed.bind(this));
    this.window.on('focus', this.onFocus.bind(this));
    this.window.on('blur', this.onBlur.bind(this));
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

  onFocus() {
    this.send('focus');
  }

  onBlur() {
    this.send('blur');
  }

  send(action, data = {}) {
    this.window.webContents.send(IPC_NAMESPACE + '::' + action, data);
  }

  closed() {
    return !this.window;
  }
}

module.exports = WindowManager;
