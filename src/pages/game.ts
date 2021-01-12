import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';

export default (parentElem: HTMLElement, observer: Observer): void => {
  const socketIoClient = new SocketIoClient(parentElem, observer);
  const board = new Board(parentElem, observer);
};
