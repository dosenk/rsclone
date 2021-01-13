/* eslint-disable @typescript-eslint/no-unused-vars */
import SocketIoClient from '../SocketIoClient/index.SocketIoClient';
import Observer from '../Observer/index.Observer';
import Board from '../Components/Board/index.Board';
import Users from '../Components/Users/index.Users';

export default (parentElem: HTMLElement, observer: Observer): void => {
  const socketIoClient = new SocketIoClient(parentElem, observer);
  const board = new Board(parentElem, observer);
  const users = new Users(parentElem, observer);
};
