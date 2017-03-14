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

  playPause() {
    if (this.selected) {

    } else {
      let playButton = this.getMostRecentPlayButton();
      let scope = angular.element(playButton).scope();
      scope.playPause(scope.episode, scope.episode.podcast);
    }
  }
}

let player = new Player();
