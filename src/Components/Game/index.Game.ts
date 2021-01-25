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
  GAME,
  GAME_STATUS,
  ROLE,
  GAME_END_INFO,
  WORDS_TO_SELECT,
} from '../../Observer/actionTypes';
import { ROLE_GUESSER, ROLE_PAINTER } from '../../Constants/index.Constants';
import IState from '../../Observer/Interfaces/IState';
import renderSelectWord from '../SelectWord/index.SelectWord';
import { gameEndPopup, gameStartPopup } from '../GameEnd/index.GameEnd';
import {
  WORD_SELECTION,
  LOADING_GAME,
  GAME_IN_PROGRESS,
  GAME_END,
  READY_TO_GAME,
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

  private newGame = () => {
    this.board.clearBoard();
    this.socket.clearChat();
    this.socket.sendReadyToGame();
  };

  private renderGameElements() {
    const { role } = this.observer.getState();
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
    this.observer.actions.setLoading(false);
  }

  private renderEndScreen() {
    const { gameEndInfo, users } = this.observer.getState();

    gameEndPopup(
      this.parenElement,
      this.observer,
      [
        this.newGame,
        this.observer.actions.setGameStatus.bind(this, READY_TO_GAME),
        this.observer.actions.setLoading,
      ],
      gameEndInfo!,
      users.painter.name
    );
  }

  private renderWaitingPlayers() {
    const { langData } = this.observer.getState();
    const { WAITING_ANOTHER_GAMERS } = langData;

    preloader(this.parenElement, WAITING_ANOTHER_GAMERS);
  }

  private renderStartScreen() {
    gameStartPopup(this.parenElement, this.observer, [
      this.socket.sendReadyToGame.bind(this.socket),
      this.observer.actions.setGameStatus.bind(this, READY_TO_GAME),
    ]);
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
      case GAME:
      case GAME_STATUS:
      case ROLE:
      case WORDS_TO_SELECT:
      case GAME_END_INFO:
        this.updateGame();
        break;

      default:
        break;
    }
  }

  public startGame() {
    this.socket.start();
  }

  public updateGame(parenElement: HTMLElement = this.parenElement) {
    this.parenElement = parenElement;
    const { gameStatus } = this.observer.getState();

    this.parenElement.textContent = '';

    switch (gameStatus) {
      case WORD_SELECTION:
        renderSelectWord(this.parenElement, this.observer, this.wordSelected);
        break;
      case LOADING_GAME:
        this.renderStartScreen();
        break;
      case READY_TO_GAME:
        this.renderWaitingPlayers();
        break;
      case GAME_IN_PROGRESS:
        this.renderGameElements();
        break;
      case GAME_END:
        this.renderEndScreen();
        break;

      default:
        break;
    }
  }
}
