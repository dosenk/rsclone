import Observer from '../../Observer/index.Observer';
import IState from '../../Observer/Interfaces/IState';
import Panel from '../Panel/index.Panel';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  CLEAR_BOARD,
} from '../../Observer/actionTypes';
import { createElement } from '../../Utils/index.Utils';

export default class Board {
  private board: HTMLCanvasElement = document.createElement('canvas');

  private context!: CanvasRenderingContext2D;

  private draw: boolean = false;

  private mouse = { x: 0, y: 0 };

  private player: boolean = true;

  private observer: Observer;

  private panel!: Panel;

  private parentElement: HTMLElement;

  private img: HTMLImageElement = document.createElement('img');

  boardWrapper: HTMLElement;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.boardWrapper = createElement('div', 'board-wrapper');
    this.observer = observer;
    this.panel = new Panel(this.boardWrapper, this, observer);
    this.start();
  }

  public start() {
    this.create();
    this.context = this.board.getContext('2d') as CanvasRenderingContext2D;
    this.board.width = 500;
    this.board.height = 500;
    this.listener();
  }

  private renderImage(parentElement: HTMLElement = this.parentElement) {
    this.img.classList.add('cursorImg');
    this.img.src = './src/assets/images/cursor1.png';
    this.img.alt = 'cursor';
    this.boardWrapper.append(this.img);
    parentElement.append(this.boardWrapper);
  }

  private displayCursor(x: number, y: number) {
    this.img.style.top = `${this.board.offsetTop + y}px`;
    this.img.style.left = `${this.board.offsetLeft + x}px`;
  }

  getPanel() {
    return this.panel;
  }

  getBoardWrapper() {
    return this.boardWrapper;
  }

  displayBoard(parentElement: HTMLElement = this.parentElement) {
    this.boardWrapper.append(this.board);
    parentElement.append(this.boardWrapper);
  }

  private create() {
    this.board = document.createElement('canvas');
    this.board.classList.add('board');
  }

  public addHost() {
    this.board.style.cursor = 'url(/src/assets/images/cursor1.png), auto';
    this.player = false;
  }

  public addPlayer() {
    this.renderImage(this.parentElement);
    this.board.style.cursor = 'auto';
    this.player = true;
  }

  public clearBoard() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
  }

  private listener() {
    this.board.addEventListener('mousedown', (event) => {
      if (!this.player) {
        this.getXandY(event);
      }
    });
    this.board.addEventListener('mousemove', (event) => {
      if (!this.player) {
        this.getXandY(event);
      }
    });
    this.board.addEventListener('mouseup', (event) => {
      if (!this.player) {
        this.getXandY(event);
      }
    });
    this.board.addEventListener('mouseout', () => {
      if (!this.player) {
        this.draw = false;
      }
    });
  }

  private getXandY(event: MouseEvent) {
    this.mouse.x =
      ((event.clientX - this.board.offsetLeft) * this.board.width) /
      this.board.clientWidth;
    this.mouse.y =
      ((event.clientY - this.board.offsetTop) * this.board.height) /
      this.board.clientHeight;
    this.drawLine(event.type, this.mouse.x, this.mouse.y, true);
  }

  public mousedown(x: number, y: number) {
    this.draw = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
    if (this.player) {
      this.img.style.display = 'block';
      this.displayCursor(x, y);
    }
  }

  public mousemove(x: number, y: number) {
    if (this.draw === true) {
      this.context.lineTo(x, y);
      this.context.stroke();
      if (this.player) {
        this.displayCursor(x, y);
      }
    }
  }

  public mouseup(x: number, y: number) {
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.closePath();
    this.draw = false;
    if (this.player) {
      this.displayCursor(x, y);
      this.img.style.display = 'none';
    }
  }

  public setColor(color: any) {
    this.chechPensil(color);
    this.context.strokeStyle = `${color}`;
  }

  private chechPensil(color: any) {
    if (color === 'white' && this.player) {
      this.img.src = './src/assets/images/cursor3.png';
    } else {
      this.img.src = './src/assets/images/cursor1.png';
    }
  }

  public setLineThickness(number: number) {
    this.context.lineWidth = number;
  }

  private setDraw(type: any, x: number, y: number, mouseEvent: string) {
    if (mouseEvent === 'mousemove' && !this.draw) return;
    this.observer.actions.setDraw({ type, x, y });
  }

  public drawLine(
    mouseEvent: string,
    x: number,
    y: number,
    painterFlag: boolean = true
  ) {
    if (mouseEvent === 'mousedown') this.mousedown(x, y);
    if (mouseEvent === 'mousemove') this.mousemove(x, y);
    if (mouseEvent === 'mouseup') this.mouseup(x, y);
    if (painterFlag) {
      this.setDraw(mouseEvent, this.mouse.x, this.mouse.y, mouseEvent);
    }
  }

  public clientDraw(actionType: string, state: IState) {
    if (actionType === DRAW && state.draw !== null) {
      this.drawLine(state.draw.type, state.draw.x, state.draw.y, false);
    }
    if (actionType === DRAW_THICKNESS && state.drawThickness !== null) {
      this.setLineThickness(state.drawThickness);
    }
    if (actionType === DRAW_COLOR && state.drawColor !== null) {
      this.setColor(state.drawColor);
    }
    if (actionType === CLEAR_BOARD) {
      this.clearBoard();
    }
  }
}
