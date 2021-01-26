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
import {
  gameEndPopup,
  gameStartPopup,
} from './GameEvents/Popaps/index.GamePopaps';
import renderGuessWord from './GameEvents/GuessWord/index.GameGuessWord';
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

  parentElement: HTMLElement;

  constructor(observer: Observer, parenElement: HTMLElement) {
    this.observer = observer;
    this.parentElement = parenElement;

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
    this.socket.sendGuessedWord(word);
    this.observer.actions.wordToGuess(word);
  };

  private newGame = () => {
    this.board.clearBoard();
    this.socket.clearChat();
    this.socket.sendReadyToGame();
  };

  private renderGameElements() {
    const { role, wordToGuess } = this.observer.getState();
    this.board.displayBoard(this.parentElement);

    if (role === ROLE_GUESSER) {
      this.board.addPlayer();
      this.socket.displayForm(this.parentElement);
      this.panel.hidePanel();
    } else if (role === ROLE_PAINTER) {
      this.board.addHost();
      this.panel.displayPanel(this.parentElement);
      renderGuessWord(wordToGuess, this.parentElement);
    }

    this.socket.displayChat(this.parentElement);
    this.users.displayUsers(this.parentElement);
    this.observer.actions.setLoading(false);
  }

  private renderEndScreen() {
    const { gameEndInfo, users } = this.observer.getState();

    gameEndPopup(
      this.parentElement,
      this.observer,
      [
        this.observer.actions.setGameStatus.bind(this, LOADING_GAME),
        this.observer.actions.setLoading,
      ],
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

    preloader(this.parentElement, WAITING_ANOTHER_GAMERS);
  }

  private renderStartScreen() {
    gameStartPopup(this.parentElement, this.observer, [
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
    this.updateGame();
    this.socket.start();
  }

  public updateGame(parenElement: HTMLElement = this.parentElement) {
    this.parentElement = parenElement;
    const { gameStatus } = this.observer.getState();

    this.parentElement.textContent = '';

    switch (gameStatus) {
      case WORD_SELECTION:
        renderSelectWord(this.parentElement, this.observer, this.wordSelected);
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
