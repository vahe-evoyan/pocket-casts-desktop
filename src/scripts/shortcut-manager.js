const {app, globalShortcut} = require('electron');
const {MEDIA_KEYS} = require('./constants');
const EventEmitter = require('events');

class ShortcutManager extends EventEmitter {
  registerMediaKeys() {
    Object.keys(MEDIA_KEYS).forEach(accelerator => {
      if (globalShortcut.isRegistered(accelerator)) return;
      globalShortcut.register(accelerator, () => {
        let eventName = MEDIA_KEYS[accelerator];
        this.emit(eventName);
      });
    });
  }

  unregisterMediaKeys() {
    Object.keys(MEDIA_KEYS).forEach(accelerator => {
      globalShortcut.unregister(accelerator);
    });
  }
}

module.exports = ShortcutManager;
