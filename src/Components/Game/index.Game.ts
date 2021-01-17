import SocketIoClient from '../../SocketIoClient/index.SocketIoClient';
import Board from '../Board/index.Board';
import Users from '../Users/index.Users';
import Preloader from '../Preloader/index.Preloader';
import Observer from '../../Observer/index.Observer';
import Panel from '../Panel/index.Panel';
import {
  LOADING,
  USERS,
  CLEAR_BOARD,
  DRAW_COLOR,
  DRAW_THICKNESS,
  DRAW,
  WORDS_TO_SELECT,
} from '../../Observer/actionTypes';
import { ROLE_GUESSER, ROLE_PAINTER } from '../../Constants/index.Constants';
import IState from '../../Observer/Interfaces/IState';
import renderSelectWord from '../SelectWord/index.SelectWord';

export default class Game {
  observer: Observer;

  socket: SocketIoClient;

  board: Board;

  users: Users;

  panel: Panel;

  preloader!: Preloader;

  parenElement: HTMLElement;

  constructor(observer: Observer, parenElement: HTMLElement) {
    this.observer = observer;
    this.parenElement = parenElement;

    this.socket = new SocketIoClient(parenElement, observer);
    this.users = new Users(parenElement, observer);

    this.board = new Board(parenElement, observer);
    this.panel = this.board.getPanel();

    observer.subscribe(this);
    observer.actions.setGame(this);
  }

  private displayGame(state: IState) {
    if (state.loading === false) {
      this.updateGame();
      this.preloader.hidePreloader();
    }
  }

  private sendInfo(state: IState, actionType: string) {
    if (state.role === ROLE_GUESSER) {
      // рисуем на доске игрока
      this.board.clientDraw(actionType, state);
    } else if (state.role === ROLE_PAINTER) {
      // отправить в сокет данные по рисованию (толщина, цвет линии и координаты)
      this.socket.sendDrowInfoToClients(actionType, state);
    }
  }

  private wordSelected = (word: string) => {
    this.parenElement.textContent = '';
    this.updateGame();
    this.socket.sendGuessedWord(word);
    this.observer.actions.setWordToGuess(word);
  };

  public update(state: IState, actionType: string) {
    switch (actionType) {
      case LOADING:
        this.displayGame(state);
        break;
      case USERS:
        this.users.setGuessers(state);
        break;
      case WORDS_TO_SELECT:
        renderSelectWord(this.parenElement, this.observer, this.wordSelected);
        break;
      case DRAW:
      case DRAW_COLOR:
      case DRAW_THICKNESS:
      case CLEAR_BOARD:
        this.sendInfo(state, actionType);
        break;

      default:
        break;
    }
  }

  public startGame() {
    this.socket.start();
    this.preloader = new Preloader(document.body);
    this.preloader.displayPreloader();
  }

  public updateGame() {
    this.board.displayBoard();
    const state = this.observer.getState();

    if (state.role === ROLE_GUESSER) {
      this.board.addPlayer();
      this.socket.displayForm(this.parenElement);
    } else if (state.role === ROLE_PAINTER) {
      this.board.addHost();
      this.panel.displayPanel();
    }

    this.socket.displayChat(this.parenElement);
    this.users.displayUsers(this.parenElement);
  }
}
