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
    this.preloader = new Preloader(document.body);

    observer.subscribe(this);
    observer.actions.setGame(this);
  }

  private sendInfo(state: IState, actionType: string) {
    if (state.role === ROLE_GUESSER) {
      this.board.clientDraw(actionType, state);
    } else if (state.role === ROLE_PAINTER) {
      this.socket.sendDrowInfoToClients(actionType, state);
    }
  }

  private wordSelected = (word: string) => {
    this.parenElement.textContent = '';
    this.socket.sendGuessedWord(word);
    this.observer.actions.wordToGuess(word);
  };

  public update(state: IState, actionType: string) {
    switch (actionType) {
      case LOADING:
        this.updateGame(state);
        break;
      case USERS:
        this.users.setUsers(state);
        break;
      case WORDS_TO_SELECT:
        this.preloader.hidePreloader();
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
    this.preloader.displayPreloader();
  }

  public updateGame(state: IState) {
    if (state.loading === false) {
      this.preloader.hidePreloader();
      this.board.displayBoard();
      if (state.role === ROLE_GUESSER) {
        this.board.addPlayer();
        this.socket.displayForm(this.parenElement);
        this.panel.hidePanel();
      } else if (state.role === ROLE_PAINTER) {
        this.board.addHost();
        this.panel.displayPanel();
      }
      this.socket.displayChat(this.parenElement);
      this.users.displayUsers(this.parenElement);
    } else {
      this.parenElement.textContent = '';
      this.board.clearBoard();
      this.socket.clearChat();
      this.preloader.displayPreloader();
    }
  }
}
