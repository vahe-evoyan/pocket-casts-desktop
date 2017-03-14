const {ipcRenderer} = require('electron')

class Player {
  constructor() {
    this.selected = null;
    ipcRenderer.on('PocketCasts::playPause', () => {
      this.playPause();
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

  playPause() {
    let mediaPlayer = this.getMediaPlayer();
    if (mediaPlayer.episode !== null) {
      mediaPlayer.playPause();
    } else {
      let playButton = this.getMostRecentPlayButton();
      let scope = angular.element(playButton).scope();
      scope.playPause(scope.episode, scope.episode.podcast);
    }
  }
}

let player = new Player();
