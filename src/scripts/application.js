const EventEmitter = require('events');
const WindowManager = require('./window-manager');
const ShortcutManager = require('./shortcut-manager');
const Player = require('./player');
const TrayManager = require('./tray');

class Application {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.window = new WindowManager();
    this.shortcuts = new ShortcutManager();
    this.tray = new TrayManager();

    this.app.on('ready', this.onReady.bind(this));
    this.app.on('window-all-closed', this.exit.bind(this));
    this.app.on('activate', this.onActivate.bind(this));

    ['next', 'previous', 'stop', 'playPause'].forEach(action => {
      this.shortcuts.on(action, this.onShortcutKeyPress.bind(this, action));
      this.tray.on(action, this.onShortcutKeyPress.bind(this, action));
    });
  }

  onShortcutKeyPress(action) {
    this.window.send(action);
  }

  onReady() {
    this.window.createWindow();
    this.window.initWindow();
    this.tray.init();
    this.shortcuts.registerMediaKeys();
  }

  onActivate() {
    if (this.window.closed()) {
      this.window.createWindow();
      this.window.initWindow();
      this.shortcuts.registerMediaKeys();
    }
  }

  exit() {
    this.shortcuts.unregisterMediaKeys();
    if (process.platform !== 'darwin') {
      this.app.quit();
    }
  }
}

module.exports = Application;
