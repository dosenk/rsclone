import Observer from '../../Observer/index.Observer';
import { createElement } from '../../Utils/index.Utils';
import {
  USERS_CLASS,
  USERS_WRAPPER_CLASS,
  PAINTER_CLASS,
  USER_PAINTER_CLASS,
  PAINTER_AVATAR_CLASS,
  PAINTER_INFO_CLASS,
  PAINTER_NICKNAME_CLASS,
  GUESSER_CLASS,
  USER_GUESSER_CLASS,
  GUESSER_INFO_CLASS,
  GUESSER_AVATAR_CLASS,
  GUESSER_NICKNAME_CLASS,
} from '../../Constants/classNames';
import { USERS } from '../../Observer/actionTypes';
import { PAINTER_INFO_TEXT, GUESSER_INFO_TEXT } from './constants';

export default class Users {
  observer: Observer;

  parentElement: HTMLElement;

  guesser: [user: { name: string }] | undefined;

  painter: { name: string } | undefined;

  painterBlock: Element | undefined;

  guesserBlock: Element | undefined;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.observer = observer;
    this.observer.subscribe(this);
  }

  public start() {
    this.renderUsersBlock(this.parentElement);
  }

  update(
    state: {
      users: { guesser: [user: { name: string }]; painter: { name: string } };
    },
    actionType: string
  ) {
    if (actionType === USERS) {
      const newGuesser = state.users.guesser;
      const newPainter = state.users.painter;
      try {
        // console.log(newGuesser, newPainter);
        this.setGuessers(newGuesser, newPainter);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    console.log(state, actionType);
  }

  setGuessers(
    newGuesser: [user: { name: string }],
    newPainter: { name: string }
  ) {
    this.painter = newPainter;
    this.guesser = newGuesser;
    // this.renderUsers(newGuesser, newPainter);
  }

  static removeUsers(...usersParams: any) {
    usersParams.forEach((param: any[]) => {
      param[0]
        .querySelectorAll(`.${param[1]}`)
        .forEach((node: { remove: () => any }) => node.remove());
    });
  }

  renderUsers(guessers: [user: { name: string }], painter: { name: string }) {
    Users.removeUsers(
      [this.guesserBlock, USER_GUESSER_CLASS],
      [this.painterBlock, USER_PAINTER_CLASS]
    );
    const guessorClasses = {
      main: USER_GUESSER_CLASS,
      avatar: GUESSER_AVATAR_CLASS,
      nickName: GUESSER_NICKNAME_CLASS,
    };
    const painterClasses = {
      main: USER_PAINTER_CLASS,
      avatar: PAINTER_AVATAR_CLASS,
      nickName: PAINTER_NICKNAME_CLASS,
    };
    this.createUser(painter.name, painterClasses, true);
    guessers.forEach((guesser: { name: string }) => {
      this.createUser(guesser.name, guessorClasses);
    });
  }

  createUser(
    nickName: string,
    classes: { main: string; avatar: string; nickName: string },
    painterFlag: boolean = false
  ): void {
    const mainBlock = painterFlag ? this.painterBlock : this.guesserBlock;
    const guesserDiv = createElement('div', classes.main, mainBlock);
    createElement('div', classes.avatar, guesserDiv);
    createElement('div', classes.nickName, guesserDiv, null, nickName);
  }

  renderUsersBlock(parentElement: HTMLElement): void {
    this.painterBlock = createElement('div', PAINTER_CLASS, null, [
      createElement('p', PAINTER_INFO_CLASS, null, null, PAINTER_INFO_TEXT),
    ]);
    this.guesserBlock = createElement('div', GUESSER_CLASS, null, [
      createElement('p', GUESSER_INFO_CLASS, null, null, GUESSER_INFO_TEXT),
    ]);
    const usersWrapper = createElement('div', USERS_WRAPPER_CLASS, null, [
      this.painterBlock,
      this.guesserBlock,
    ]);
    parentElement.append(
      createElement('div', USERS_CLASS, null, [usersWrapper])
    );
  }
}
