import type Observer from '../Observer/index.Observer';
import Game from '../Components/Game/index.Game';

export default (parentElem: HTMLElement, observer: Observer): void => {
  const state = observer.getState();

  if (state.game instanceof Game) {
    state.game.updateGame();
  } else {
    const game = new Game(observer, parentElem);

    game.startGame();
  }
};
