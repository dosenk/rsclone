import {
  GUESSER_AVATAR_CLASS,
  PAINTER_AVATAR_CLASS,
  PRIMARY_BTN_CLASS,
  PRIMARY_TEXT_CLASS,
} from '../../Constants/classNames';
import type Observer from '../../Observer/index.Observer';

import { createElement } from '../../Utils/index.Utils';
import createModal from '../Modal/index.Modal';
import {
  EG_BLOCK_CN,
  EG_CONTAINER_CN,
  EG_BTN_CN,
  EG_TEXT_CN,
} from './constants.GameEnd';

const createWinnerBlock = (
  langData: { [key: string]: string },
  winner?: string
) => {
  const { WINNER, NO_ONE_GAVE_ANSWER } = langData;

  if (winner) {
    return createElement(
      'div',
      [EG_BLOCK_CN, EG_TEXT_CN],
      null,
      null,
      NO_ONE_GAVE_ANSWER
    );
  }

  const winnerAvatar = createElement('div', GUESSER_AVATAR_CLASS);
  const winnerTitle = createElement('div', EG_TEXT_CN, null, null, WINNER);
  const winnerName = createElement(
    'div',
    PRIMARY_TEXT_CLASS,
    null,
    null,
    winner
  );
  const winnerBlock = createElement('div', EG_BLOCK_CN, null, [
    winnerTitle,
    winnerAvatar,
    winnerName,
  ]);

  return winnerBlock;
};
const createPainterBlock = (
  langData: { [key: string]: string },
  painter: string
) => {
  const { PAINTER } = langData;

  const painterTitle = createElement('div', EG_TEXT_CN, null, null, PAINTER);
  const painterName = createElement(
    'div',
    PRIMARY_TEXT_CLASS,
    null,
    null,
    painter
  );
  const painterAvatar = createElement('div', PAINTER_AVATAR_CLASS);
  const painterBlock = createElement('div', EG_BLOCK_CN, null, [
    painterTitle,
    painterAvatar,
    painterName,
  ]);

  return painterBlock;
};

export default (
  parentElem: Element,
  observer: Observer,
  closeListener: Function,
  word: string,
  painter: string,
  winner?: string
) => {
  const { langData } = observer.getState();
  const { NEXT_GAME, WORD } = langData;

  const wordTitle = createElement('span', EG_TEXT_CN, null, null, `${WORD}: `);
  const wordText = createElement('span', PRIMARY_TEXT_CLASS, null, null, word);
  const wordBlock = createElement('div', EG_BLOCK_CN, null, [
    wordTitle,
    wordText,
  ]);

  const winnerBlock = createWinnerBlock(langData, winner);
  const painterBlock = createPainterBlock(langData, painter);

  const continueBtn = createElement(
    'button',
    [PRIMARY_BTN_CLASS, EG_BTN_CN],
    null,
    null,
    NEXT_GAME
  );

  const container = createElement('div', EG_CONTAINER_CN);
  container.append(wordBlock, winnerBlock, painterBlock, continueBtn);

  const closePopup = createModal(parentElem, container, closeListener);
  continueBtn.addEventListener('click', (e) => closePopup(e));
};
