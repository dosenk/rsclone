import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';
import Users from '../Components/Users/index.Users';

export default (parentElem: HTMLElement, observer: Observer): Destroyer => {
  const board = new Board(parentElem, observer);
  board.start();

  const users = new Users(parentElem, observer);
  users.start();

  const state = observer.getState();

  if (state.socket === undefined) {
    const socketIoClient = new SocketIoClient(parentElem, observer);
    observer.actions.setScoket(socketIoClient);
  } else {
    observer.actions.setUsers(state.users);
    observer.actions.setRole(state.role);
  }

  return () => {
    observer.unsubscribe(board, users);
  };
};
