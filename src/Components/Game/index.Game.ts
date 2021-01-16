import SocketIoClient from '../../SocketIoClient/index.SocketIoClient';
import Board from '../Board/index.Board';
import Users from '../Users/index.Users';
import Preloader from '../Preloader/index.Preloader';
import Observer from '../../Observer/index.Observer';

export default class Game {
  socket: SocketIoClient;

  board: Board;

  users: Users;

  constructor(
    // observer: Observer,
    socket: SocketIoClient,
    board: Board,
    users: Users
  ) {
    this.socket = socket;
    this.board = board;
    this.users = users;
    // this.observer = observer;
    // this.observer.subscribe(this);
  }

  //   update(state, actionType) {
  //     console.log(state, actionType);
  //   }

  start() {
    this.board.start();
  }

  updateGame() {
    this.board.start();
  }
}
