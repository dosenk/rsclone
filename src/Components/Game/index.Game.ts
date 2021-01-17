/* eslint-disable import/no-cycle */
import SocketIoClient from '../../SocketIoClient/index.SocketIoClient';
import Board from '../Board/index.Board';
import Users from '../Users/index.Users';
import Preloader from '../Preloader/index.Preloader';
import Observer from '../../Observer/index.Observer';
import Panel from '../Panel/index.Panel';
import { LOADING, USERS } from '../../Observer/actionTypes';
import { ROLE_GUESSER, ROLE_PAINTER } from '../../Constants/index.Constants';
import IState from '../../Observer/Interfaces/IState';

export default class Game {
  observer: Observer;

  socket: SocketIoClient;

  board: Board;

  users: Users;

  panel: Panel;

  preloader!: Preloader;

  parenElement: HTMLElement;

  constructor(
    observer: Observer,
    socket: SocketIoClient,
    board: Board,
    users: Users,
    parenElement: HTMLElement
  ) {
    this.socket = socket;
    this.board = board;
    this.panel = this.board.getPanel();
    this.users = users;
    this.parenElement = parenElement;
    this.observer = observer;
    this.observer.subscribe(this);
  }

  public update(state: IState, actionType: string) {
    if (state.role === ROLE_GUESSER) {
      // рисуем на доске игрока
      this.board.clientDraw(actionType, state);
    }
    if (state.role === ROLE_PAINTER) {
      // отправить в сокет данные по рисованию (толщина, цвет линии и координаты)
      this.socket.sendDrowInfoToClients(actionType, state);
    }
    if (actionType === LOADING) {
      this.displayGame(state);
    }
    if (actionType === USERS) {
      this.users.setGuessers(state);
    }
  }

  displayGame(state: IState) {
    if (state.loading === false) {
      this.updateGame();
      this.preloader.hidePreloader();
    }
  }

  startGame() {
    this.socket.start();
    this.preloader = new Preloader(document.body);
    this.preloader.displayPreloader();
  }

  updateGame() {
    this.board.displayBoard();
    const state = this.observer.getState();
    if (state.role === ROLE_GUESSER) {
      this.board.addPlayer();
      this.socket.displayForm(this.parenElement);
    }
    if (state.role === ROLE_PAINTER) {
      this.board.addHost();
      this.panel.displayPanel();
    }
    this.socket.displayChat(this.parenElement);
    this.users.displayUsers(this.parenElement);
  }
}
