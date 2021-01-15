import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';
import Users from '../Components/Users/index.Users';

export default (parentElem: HTMLElement, observer: Observer): Destroyer => {
  const socketIoClient = new SocketIoClient(parentElem, observer);
  socketIoClient.start();

  const board = new Board(parentElem, observer);
  board.start();

  const users = new Users(parentElem, observer);
  users.start();

  return () => {
    observer.unsubscribe(socketIoClient, board, users);
  };
};
