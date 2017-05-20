const {Tray, Menu} = require('electron');
const path = require('path');
const os = require('os');
const EventEmitter = require('events');

const {MEDIA_KEYS} = require('./constants');
const ASSET_PATH = path.normalize(path.join(__dirname, '..', 'assets'));
const platform = os.platform();

class TrayManager extends EventEmitter {
  constructor() {
    super();
    this.tray = null;
  }

  init() {
    this.tray = new Tray(this.getIcon());
    this.tray.setToolTip('PocketCasts');
    this.tray.setContextMenu(this.getMenu());
  }

  getMenu() {
    return Menu.buildFromTemplate([{
      label: 'Play / Pause',
      click: () => {
        this.emit(MEDIA_KEYS.MediaPlayPause);
      }
    }, {
      label: 'Skip Back',
      click: () => {
        this.emit(MEDIA_KEYS.MediaPreviousTrack);
      }
    }, {
      label: 'Skip Forward',
      click: () => {
        this.emit(MEDIA_KEYS.MediaNextTrack);
      }
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }]);
  }

  getIcon() {
    let imagePath;
    if (platform === 'darwin') {
      imagePath = `${ASSET_PATH}/icon-tray.png`;
    } else if (platform === 'win32') {
      imagePath = `${ASSET_PATH}/icon-tray.ico`;
    }
    return imagePath;
  }
}

module.exports = TrayManager;
