const EventEmitter = require('events');
const {ipcRenderer} = require('electron');

class Player extends EventEmitter {
  constructor(webview) {
    super();
    this.webview = webview;
    ipcRenderer.on('PocketCasts::playPause', () => {
      this.playPause();
    });
    ipcRenderer.on('PocketCasts::next', () => {
      this.skipForward();
    });
    ipcRenderer.on('PocketCasts::previous', () => {
      this.skipBack();
    });
  }

  playPause() {
    this.webview.send('PocketCasts::playPause');
  }

  skipForward() {
    this.webview.send('PocketCasts::next');
  }

  skipBack() {
    this.webview.send('PocketCasts::previous');
  }
}

module.exports = Player;
