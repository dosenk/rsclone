import Observer from '../../Observer/index.Observer';
import { createElement } from '../../Utils/index.Utils';
import {
  USERS_CLASS,
  USERS_WRAPPER_CLASS,
  USER_GUESSER_CLASS,
  GUESSER_AVATAR_CLASS,
  GUESSER_NICKNAME_CLASS,
} from '../../Constants/classNames';
import { USERS } from '../../Observer/actionTypes';

export default class Users {
  observer: Observer;

  parentElement: HTMLElement;

  guesser: Array<Object>;

  static userBlock: Element;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.observer = observer;
    this.observer.subscribe(this);
    this.guesser = [];
    Users.renderUsersBlock(parentElement);
  }

  update(state: { users: { guesser: Array<Object> } }, actionType: string) {
    if (actionType === USERS) {
      const newGuesser = state.users.guesser;
      this.setGuessers(newGuesser);
    }
  }

  setGuessers(newGuesser: Object[]) {
    this.guesser = newGuesser;
    this.renderGuessers();
  }

  renderGuessers() {
    Users.userBlock.innerHTML = '';
    this.guesser.forEach((user: { name: string }) => {
      Users.createGuesser(user.name);
    });
  }

  static createGuesser(nickName: string): void {
    const guesserDiv = createElement(
      'div',
      USER_GUESSER_CLASS,
      Users.userBlock
    );
    createElement('div', GUESSER_AVATAR_CLASS, guesserDiv);
    createElement('div', GUESSER_NICKNAME_CLASS, guesserDiv, null, nickName);
  }

  static renderUsersBlock(parentElement: HTMLElement): void {
    Users.userBlock = createElement('div', USERS_CLASS);
    createElement('div', USERS_WRAPPER_CLASS, Users.userBlock);
    parentElement.append(Users.userBlock);
  }
}
