import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';
import Users from '../Components/Users/index.Users';
import Game from '../Components/Game/index.Game';

export default (parentElem: HTMLElement, observer: Observer): Destroyer => {
  const state = observer.getState();

  if (state.game instanceof Game) {
    // todo: что сделать чтобы обновить актуальные данные в игре ! ! !
    state.game.updateGame();
  } else {
    const board = new Board(parentElem, observer);
    const users = new Users(parentElem, observer);
    const socketIoClient = new SocketIoClient(parentElem, observer); // инициализация после board и users !

    const game = new Game(socketIoClient, board, users);
    game.start();
    observer.actions.setGame(game);
  }

  // return () => {
  //   observer.unsubscribe(board, users);
  // };
};
