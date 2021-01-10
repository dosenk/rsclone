import Observer from '../../Observer/index.Observer';
import Panel from './index.Panel';

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
    this.panel = new Panel(parentElement, this);
    this.observer.subscribe(this);
  }

  public update(state: { role: string }) {
    if (state.role === 'guesser') {
      this.addPlayer();
      this.panel.displayPanel();
    } else if (state.role === 'painter') {
      this.addHost();
      this.panel.hidePanel();
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
      this.setDraw('mousemove', this.mouse.x, this.mouse.y);
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
