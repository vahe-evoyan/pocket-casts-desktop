const {ipcRenderer} = require('electron');

class Player {
  constructor() {
    this.selected = null;
    this.windowFocused = false;
    ipcRenderer.on('PocketCasts::playPause', () => {
      this.playPause();
    });
    ipcRenderer.on('PocketCasts::previous', () => {
      this.skipBack();
    });
    ipcRenderer.on('PocketCasts::next', () => {
      this.skipForward();
    });
    ipcRenderer.on('PocketCasts::focus', () => {
      this.windowFocused = true;
    });
    ipcRenderer.on('PocketCasts::blur', () => {
      this.windowFocused = false;
    });
  }

  getMostRecentPlayButton() {
    let episodeRow = document.querySelector('.episodes_list div.episode_row');
    return episodeRow.querySelector('.episode_button');
  }

  getMediaPlayer() {
    let ctrl = angular.element('[ng-controller="PlayerController"]');
    return ctrl.scope().mediaPlayer;
  }

  popNotification() {
    if (!this.windowFocused) {
      const mediaPlayer = this.getMediaPlayer();
      new Notification('PocketCasts', {
        body: mediaPlayer.episode.title,
        title: 'PocketCasts',
        silent: true
      });
    }
  }

  playPause() {
    const mediaPlayer = this.getMediaPlayer();
    if (mediaPlayer.episode !== null) {
      mediaPlayer.playPause();
    } else {
      let playButton = this.getMostRecentPlayButton();
      let scope = angular.element(playButton).scope();
      scope.playPause(scope.episode, scope.episode.podcast);
    }
    this.popNotification();
  }

  skipBack() {
    const mediaPlayer = this.getMediaPlayer();
    if (mediaPlayer.episode !== null) {
      mediaPlayer.jumpBack();
    }
  }

  skipForward() {
    const mediaPlayer = this.getMediaPlayer();
    if (mediaPlayer.episode !== null) {
      mediaPlayer.jumpForward();
    }
  }
}

let player = new Player();
