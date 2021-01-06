export default class Board {
  private board: HTMLCanvasElement = document.createElement('canvas');

  private context: CanvasRenderingContext2D;

  private draw: boolean = false;

  private mouse = { x: 0, y: 0 };

  private player: boolean = true;

  constructor() {
    this.render();
    this.context = (this.board.getContext(
      '2d'
    ) as unknown) as CanvasRenderingContext2D;
  }

  private render() {
    const { body } = document;
    this.board = document.createElement('canvas');
    this.board.classList.add('board');
    this.board.style.cursor = 'url(/src/assets/images/cursor1.png), auto';
    body.append(this.board);
  }

  public startListener() {
    this.player = false;
    this.listener();
  }

  public removeListener() {
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

  public getXandY(event: MouseEvent) {
    this.mouse.x =
      ((event.clientX - this.board.offsetLeft) * this.board.width) /
      this.board.clientWidth;
    this.mouse.y =
      ((event.clientY - this.board.offsetTop) * this.board.height) /
      this.board.clientHeight;
    if (event.type === 'mousedown') this.mousedown(this.mouse.x, this.mouse.y);
    if (event.type === 'mousemove') this.mousemove(this.mouse.x, this.mouse.y);
    if (event.type === 'mouseup') this.mouseup(this.mouse.x, this.mouse.y);
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
}
