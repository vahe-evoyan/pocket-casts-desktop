const EventEmitter = require('events');
const WindowManager = require('./window-manager');


class Application {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.window = new WindowManager();

    this.app.on('ready', this.onReady.bind(this));
    this.app.on('window-all-closed', this.exit.bind(this));
    this.app.on('activate', this.onActivate.bind(this));
  }

  onReady() {
    this.window.createWindow();
    this.window.initWindow();
  }

  onActivate() {
    if (this.window.closed()) {
      this.window.createWindow();
      this.window.initWindow();
    }
  }

  exit() {
    if (process.platform !== 'darwin') {
      this.app.quit();
    }
  }
}

module.exports = Application;
