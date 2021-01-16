import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';
import Users from '../Components/Users/index.Users';
import Game from '../Components/Game/index.Game';

export default (parentElem: HTMLElement, observer: Observer): void => {
  const state = observer.getState();

  if (state.game instanceof Game) {
    state.game.updateGame();
  } else {
    const board = new Board(parentElem, observer);
    const users = new Users(parentElem, observer);
    // инициализация после board и users !
    const socketIoClient = new SocketIoClient(parentElem, observer);
    const game = new Game(observer, socketIoClient, board, users);
    game.startGame();
    observer.actions.setGame(game);
  }
};
