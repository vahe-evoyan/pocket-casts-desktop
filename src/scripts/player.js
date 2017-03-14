const EventEmitter = require('events');
const {ipcRenderer} = require('electron');

class Player extends EventEmitter {
  constructor(webview) {
    super();
    this.webview = webview;
    ipcRenderer.on('PocketCasts::playPause', () => {
      this.playPause();
    });
  }

  playPause() {
    this.webview.send('PocketCasts::playPause')
  }
}

module.exports = Player;
