import SocketIoClient from '../../SocketIoClient/index.SocketIoClient';
import Board from '../Board/index.Board';
import Users from '../Users/index.Users';
import preloader from '../Preloader/index.Preloader';
import Observer from '../../Observer/index.Observer';
import Panel from '../Panel/index.Panel';
import {
  USERS,
  CLEAR_BOARD,
  DRAW_COLOR,
  DRAW_THICKNESS,
  DRAW,
} from '../../Observer/actionTypes';
import { ROLE_GUESSER, ROLE_PAINTER } from '../../Constants/index.Constants';
import IState from '../../Observer/Interfaces/IState';
import renderSelectWord from '../SelectWord/index.SelectWord';
import gameEndPopup from '../GameEnd/index.GameEnd';
import {
  WORD_SELECTION,
  LOADING_GAME,
  GAME_IN_PROGRESS,
  GAME_END,
} from './statuses';

export default class Game {
  observer: Observer;

  socket: SocketIoClient;

  board: Board;

  users: Users;

  panel: Panel;

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

  private beginOfGame(role: string) {
    this.board.displayBoard();

    if (role === ROLE_GUESSER) {
      this.board.addPlayer();
      this.socket.displayForm(this.parenElement);
      this.panel.hidePanel();
    } else if (role === ROLE_PAINTER) {
      this.board.addHost();
      this.panel.displayPanel();
    }

    this.socket.displayChat(this.parenElement);
    this.users.displayUsers(this.parenElement);
  }

  public update(state: IState, actionType: string) {
    switch (actionType) {
      case USERS:
        this.users.setUsers(state);
        break;
      case DRAW:
      case DRAW_COLOR:
      case DRAW_THICKNESS:
      case CLEAR_BOARD:
        this.sendInfo(state, actionType);
        break;

      default:
        this.updateGame();
        break;
    }
  }

  public startGame = () => {
    this.observer.actions.setGameStatus(LOADING_GAME);
    this.socket.start();
    this.board.clearBoard();
    this.socket.clearChat();
  };

  public updateGame() {
    const {
      gameStatus,
      role,
      langData,
      gameEndInfo,
      users,
    } = this.observer.getState();
    const { WAITING_ANOTHER_GAMERS } = langData;

    this.parenElement.textContent = '';

    switch (gameStatus) {
      case WORD_SELECTION:
        renderSelectWord(this.parenElement, this.observer, this.wordSelected);
        break;
      case LOADING_GAME:
        preloader(this.parenElement, WAITING_ANOTHER_GAMERS);
        break;
      case GAME_IN_PROGRESS:
        this.beginOfGame(role);
        break;
      case GAME_END:
        gameEndPopup(
          this.parenElement,
          this.observer,
          this.startGame,
          gameEndInfo!,
          users.painter.name
        );
        break;

      default:
        break;
    }
  }
}
