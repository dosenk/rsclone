import Observer from '../../Observer/index.Observer';
import IDraw from '../../Observer/Interfaces/IDraw';
import Panel from '../Panel/index.Panel';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  ROLE,
  CLEAR_BOARD,
} from '../../Observer/actionTypes';

import { ROLE_GUESSER, ROLE_PAINTER } from '../../Constants/index.Constants';

export default class Board {
  private board: HTMLCanvasElement = document.createElement('canvas');

  private context: CanvasRenderingContext2D;

  private draw: boolean = false;

  private mouse = { x: 0, y: 0 };

  private player: boolean = true;

  private observer: Observer;

  private panel: Panel;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.observer = observer;
    this.render(parentElement);
    this.context = (this.board.getContext(
      '2d'
    ) as unknown) as CanvasRenderingContext2D;
    this.listener();
    this.panel = new Panel(parentElement, this, observer);
    this.observer.subscribe(this);
  }

  public update(
    state: {
      role: string;
      draw: IDraw;
      drawThickness: number;
      drawColor: string;
    },
    actionType: string
  ) {
    try {
      if (state.role === ROLE_PAINTER) {
        if (actionType === ROLE) {
          this.addHost();
          this.panel.displayPanel();
        }
      }
      if (state.role === ROLE_GUESSER) {
        if (actionType === ROLE) {
          this.addPlayer();
          this.panel.hidePanel();
        }
        if (actionType === DRAW && state.draw !== null) {
          if (state.draw.type === 'mousedown')
            this.mousedown(state.draw.x, state.draw.y);
          if (state.draw.type === 'mousemove')
            this.mousemove(state.draw.x, state.draw.y);
          if (state.draw.type === 'mouseup')
            this.mouseup(state.draw.x, state.draw.y);
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  private render(parentElement: HTMLElement) {
    this.board = document.createElement('canvas');
    this.board.classList.add('board');
    parentElement.append(this.board);
  }

  public addHost() {
    this.board.style.cursor = 'url(/src/assets/images/cursor1.png), auto';
    this.player = false;
  }

  public addPlayer() {
    this.board.style.cursor = 'auto';
    this.player = true;
  }

  public clearBoard() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
    // this.observer.actions.clearBoard();
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

    if (event.type === 'mousedown') {
      this.setDraw('mousedown', this.mouse.x, this.mouse.y);
      this.mousedown(this.mouse.x, this.mouse.y);
    }
    if (event.type === 'mousemove') {
      if (this.draw) this.setDraw('mousemove', this.mouse.x, this.mouse.y);
      this.mousemove(this.mouse.x, this.mouse.y);
    }
    if (event.type === 'mouseup') {
      this.setDraw('mouseup', this.mouse.x, this.mouse.y);
      this.mouseup(this.mouse.x, this.mouse.y);
    }
  }

  public mousedown(x: number, y: number) {
    this.draw = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  public mousemove(x: number, y: number) {
    if (this.draw === true) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  public mouseup(x: number, y: number) {
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.closePath();
    this.draw = false;
  }

  public setColor(color: any) {
    this.context.strokeStyle = `${color}`;
  }

  public setLineThickness(number: number) {
    this.context.lineWidth = number;
  }

  private setDraw(type: any, x: number, y: number) {
    this.observer.actions.setDraw({ type, x, y });
  }
}
